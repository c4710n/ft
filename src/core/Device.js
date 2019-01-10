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
   * User agent.
   */
  static get UA() {
    const ua =
      window && window.navigator && window.navigator.userAgent
        ? window.navigator.userAgent
        : ''

    return ua
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

  get isIOS() {
    const pattern = /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i
    return pattern.test(Device.UA)
  }

  get isAndroid() {
    const pattern = /android/i
    return pattern.test(Device.UA)
  }

  get isWeChat() {
    const pattern = /MicroMessenger/i
    return pattern.test(Device.UA)
  }

  get isQQ() {
    const pattern_ios = new RegExp(
      '(iPad|iPhone|iPod).*? (IPad)?QQ\\/([\\d\\.]+)'
    )
    const pattern_android = new RegExp(
      '\\bV1_AND_SQI?_([\\d\\.]+)(.*? QQ\\/([\\d\\.]+))?',
      'ig'
    )
    return pattern_ios.test(Device.UA) || pattern_android.test(Device.UA)
  }

  get isQQBrowser() {
    const pattern = /m?(qqbrowser)[\/\s]?([\w\.]+)/i // eslint-disable-line
    return pattern.test(Device.UA)
  }
}

export default Device
