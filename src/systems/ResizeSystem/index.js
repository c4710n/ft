import System from '../System'
import Device from '../../core/Device'
import events from '../../events'
import { delay } from '../../time'

class ResizeSystem extends System {
  constructor() {
    super('resize')

    const { width, height } = Device.cssSize.clone()
    this.$cachedWidth = width
    this.$cachedHeight = height
    this.$cachedHasInputFocused = false
    this.$emitLock = false

    events.resize.emit()
  }

  update() {
    const hasInputFocused =
      document.activeElement &&
      document.activeElement.tagName === 'INPUT' &&
      document.hasFocus()

    const isInputSwitchToFocused =
      this.$cachedHasInputFocused === false && hasInputFocused === true
    const isInputSwitchToBlured =
      this.$cachedHasInputFocused === true && hasInputFocused === false

    if (isInputSwitchToFocused) {
      console.log('switch to focused')
    } else if (isInputSwitchToBlured) {
      this.delayEmitResizeEvent()
    } else if (!hasInputFocused) {
      this.emitResizeEvent()
    }

    this.$cachedHasInputFocused = hasInputFocused
  }

  emitResizeEvent() {
    if (this.$emitLock) return

    const { width, height } = Device.cssSize.clone()
    if (width !== this.$cachedWidth || height !== this.$cachedHeight) {
      this.$cachedWidth = width
      this.$cachedHeight = height
      events.resize.emit()
    }
  }

  async delayEmitResizeEvent() {
    if (this.$emitLock) return

    this.$emitLock = true
    await delay(1500)
    this.$emitLock = false

    this.emitResizeEvent()
  }
}

export default ResizeSystem
