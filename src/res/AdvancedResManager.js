import EventEmitter from 'eventemitter3'
import ResManager from './ResManager'
import TimeMixer from './TimeMixer'

class AdvancedResManager extends ResManager {
  constructor({ concurrency = 10, mixTime = 1000, mixRatio = 0.2 } = {}) {
    super('', concurrency)

    this.mixTime = mixTime
    this.mixRatio = mixRatio

    this._ee_ = new EventEmitter()

    this.currentProgressRM = 0
    this.currentProgressTM = 0
    this.loadComplete = false
  }

  setMix({ time, ratio } = {}) {
    if (time) this.mixTime = time
    if (ratio) this.mixRatio = ratio
  }

  on(...args) {
    this._ee_.on(...args)
  }

  once(...args) {
    this._ee_.once(...args)
  }

  off(...args) {
    this._ee_.off(...args)
  }

  load() {
    // resource manager
    const rm = this
    rm.onProgress.add(({ progress }) => {
      this.onProgressChange({ rm: progress })
    })
    rm.onComplete.add(({ progress }) => {
      this.onProgressChange({ rm: progress })
    })

    // time mixer
    const { mixTime } = this
    const tm = new TimeMixer(mixTime)
    this.tm = tm
    tm.onProgress.add(({ progress }) => {
      this.onProgressChange({ tm: progress })
    })
    tm.onComplete.add(({ progress }) => {
      this.onProgressChange({ tm: progress })
    })

    super.load()
    this.tm.load()
  }

  onProgressChange({ rm, tm } = {}) {
    const { mixRatio } = this

    const { currentProgressRM, currentProgressTM } = this

    const newProgressRM = rm || currentProgressRM
    const newProgressTM = tm || currentProgressTM

    this.currentProgressRM = newProgressRM
    this.currentProgressTM = newProgressTM

    const progress = (1 - mixRatio) * newProgressRM + mixRatio * newProgressTM

    if (progress == 100) {
      if (!this.loadComplete) {
        this.loadComplete = true
        this._ee_.emit('complete', progress)
      }
    } else {
      this._ee_.emit('progress', progress)
    }
  }
}

AdvancedResManager.default = new AdvancedResManager()

export default AdvancedResManager
