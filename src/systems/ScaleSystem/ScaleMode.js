import { Rectangle } from 'pixi.js'
import { Device, Orientation } from '../../core'

function getRendererOrientation(width, height) {
  return width >= height ? Orientation.LANDSCAPE : Orientation.PORTRAIT
}

function getDeviceOrientation(width, height) {
  return width >= height ? Orientation.LANDSCAPE : Orientation.PORTRAIT
}

function isOrientationMatched(
  rendererWidth,
  rendererHeight,
  devicePixelWidth,
  devicePixelHeight
) {
  return (
    getRendererOrientation(rendererWidth, rendererHeight) ===
    getDeviceOrientation(devicePixelWidth, devicePixelHeight)
  )
}

function generate(
  designWidth,
  designHeight,
  deviceWidth,
  deviceHeight,
  calculator
) {
  const shouldRotate = !isOrientationMatched(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight
  )

  if (shouldRotate) {
    ;[deviceWidth, deviceHeight] = [deviceHeight, deviceWidth]
  }

  const stage = calculator(designWidth, designHeight, deviceWidth, deviceHeight)

  const values = {
    stage,
    viewportWidth: Math.round(Device.size.width),
    viewportHeight: Math.round(Device.size.height),
    viewportCSSWidth: Math.round(Device.cssSize.width),
    viewportCSSHeight: Math.round(Device.cssSize.height),
    shouldRotate,
  }

  return values
}

function calculatorCover(designWidth, designHeight, deviceWidth, deviceHeight) {
  const scale = Math.max(deviceWidth / designWidth, deviceHeight / designHeight)

  const _width = designWidth * scale
  const _height = designHeight * scale
  const x = (deviceWidth - _width) / 2
  const y = (deviceHeight - _height) / 2

  const width = designWidth
  const height = designHeight
  const centerX = width / 2
  const centerY = height / 2

  const boundsX = -x / scale
  const boundsY = -y / scale
  const bounds = new Rectangle(
    boundsX,
    boundsY,
    designWidth - 2 * boundsX,
    designHeight - 2 * boundsY
  )

  const stage = new Rectangle(x, y, width, height)
  stage.scale = scale
  stage.centerX = centerX
  stage.centerY = centerY
  stage.bounds = bounds

  return stage
}

export function COVER(designWidth, designHeight, deviceWidth, deviceHeight) {
  return generate(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight,
    calculatorCover
  )
}

export default {
  COVER,
}
