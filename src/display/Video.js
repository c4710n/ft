import { Layer, PIXI } from '../core'
import { timeout } from '../time'

class Video extends PIXI.Container {
  /**
   * @param {string} url='' url of video
   * @param {Object} options
   */
  constructor(
    url,
    {
      layer = Layer.DOM_DISPLAY,
      poster,
      loop = false,
      onShowSpinner,
      onHideSpinner,
    } = {}
  ) {
    super()

    this.$readyTime = 0
    this.$playing = false
    this.$previousTime = 0

    this.videoPlayer = this.createVideoPlayer(url, { layer, poster, loop })

    this.onShowSpinner = onShowSpinner
    this.onHideSpinner = onHideSpinner
    this.$spinnerTimer = timeout(500, () => {
      if (this.isCaching) {
        this.onShowSpinner?.(this)
      }
    })
  }

  onAdded() {}

  onRemoved() {}

  onUpdate() {
    if (this.isPlaying) {
      this.$spinnerTimer.reset()

      const { currentTime } = this
      this.$previousTime = currentTime
      this.emit('progress', currentTime)
    }

    if (this.isPlaying || this.isPaused) {
      this.onHideSpinner?.(this)
    }
  }

  // eslint-disable-next-line
  createVideoPlayer(url, { layer, poster, loop } = {}) {}

  setSize(...args) {
    this.video.setSize(...args)

    return this
  }

  setAngle(...args) {
    this.video.setAngle(...args)

    return this
  }

  setLayer(layer = Layer.DOM_DISPLAY_HIDDEN) {
    this.videoPlayer.style.zIndex = layer

    return this
  }

  unlock() {}

  play() {
    this.emit('play')
    return this.nativePlay()
  }

  pause() {
    this.emit('pause')
    return this.nativePause()
  }

  reset() {
    this.emit('reset')
    this.videoPlayer.currentTime = this.$readyTime
  }

  nativePlay() {
    this.$playing = true
    this.$spinnerTimer.start()
  }

  nativePause() {
    this.$playing = false
    this.$spinnerTimer.stop()
  }

  onEnd = () => {
    this.emit('end')
    this.$playing = false
    this.$spinnerTimer.stop()
    this.onHideSpinner?.(this)
  }

  get duration() {
    return this.videoPlayer.duration
  }

  get currentTime() {
    return this.videoPlayer.currentTime
  }

  set currentTime(value) {
    this.videoPlayer.currentTime = value
  }

  get isCaching() {
    return this.added && this.$playing && this.currentTime <= this.$previousTime
  }

  get isPlaying() {
    return this.added && this.$playing && this.currentTime > this.$previousTime
  }

  get isPaused() {
    return (
      this.added && !this.$playing && this.currentTime == this.$previousTime
    )
  }
}

export default Video
