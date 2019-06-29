import System from '../System'
import Device from '../../core/Device'
import events from '../../events'

class ResizeSystem extends System {
  constructor() {
    super('resize')

    const { width, height } = Device.cssSize.clone()
    this.$cachedWidth = width
    this.$cachedHeight = height

    events.resize.emit()
  }

  update() {
    const { width, height } = Device.cssSize.clone()
    if (width !== this.$cachedWidth || height !== this.$cachedHeight) {
      this.$cachedWidth = width
      this.$cachedHeight = height
      events.resize.emit()
    }
  }
}

export default ResizeSystem
