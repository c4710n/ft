import PIXI from '#/pixi'
import Orientation from './Orientation'

const { Rectangle } = PIXI

class Device {
  static get DPR() {
    return window.devicePixelRatio || 1
  }

  static get cssSize() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    return new Rectangle(0, 0, width, height)
  }

  static get size() {
    const { width: cssWidth, height: cssHeight } = this.cssSize
    const width = cssWidth * Device.DPR
    const height = cssHeight * Device.DPR
    return new Rectangle(0, 0, width, height)
  }

  static get orientation() {
    return Device.isLandscape ? Orientation.LANDSCAPE : Orientation.PORTRAIT
  }

  static get isLandscape() {
    const { width, height } = Device.cssSize
    return width >= height
  }

  static get isPortrait() {
    return !Device.isLandscape
  }
}

export default Device
