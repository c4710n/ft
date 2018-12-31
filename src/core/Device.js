import PIXI from '#/pixi'
import Orientation from './Orientation'

/**
 * Get metadata of device.
 */
class Device {
  /**
   * DPR of current device.
   */
  static get DPR() {
    return window.devicePixelRatio || 1
  }

  /**
   * Size in CSS pixel of current device.
   */
  static get cssSize() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    return new PIXI.Rectangle(0, 0, width, height)
  }

  /**
   * Size in physical pixel of current device.
   */
  static get size() {
    const { width: cssWidth, height: cssHeight } = this.cssSize
    const width = cssWidth * Device.DPR
    const height = cssHeight * Device.DPR
    return new PIXI.Rectangle(0, 0, width, height)
  }

  /**
   * Orientation of current device.
   */
  static get orientation() {
    return Device.isLandscape ? Orientation.LANDSCAPE : Orientation.PORTRAIT
  }

  /**
   * Whether current device's orientation is landscape.
   */
  static get isLandscape() {
    const { width, height } = Device.cssSize
    return width >= height
  }

  /**
   * Whether current device's orientation is portrait.
   */
  static get isPortrait() {
    return !Device.isLandscape
  }
}

export default Device
