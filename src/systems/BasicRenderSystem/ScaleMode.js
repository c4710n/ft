import PIXI from '#/pixi'
import { Device, Orientation } from '#/core'

const { Rectangle } = PIXI

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

  const centerX = stage.width / 2
  const centerY = stage.height / 2
  const center = [centerX, centerY]
  stage.centerX = centerX
  stage.centerY = centerY
  stage.center = center

  const bounds = new Rectangle(
    -stage.x,
    -stage.y,
    designWidth + 2 * stage.x,
    designHeight + 2 * stage.y
  )
  stage.bounds = bounds

  const device = new Rectangle(
    -stage.x,
    -stage.y,
    deviceWidth * stage.scale,
    deviceHeight * stage.scale
  )
  stage.device = device

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

  const x = (deviceWidth / scale - designWidth) / 2
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  const stage = new Rectangle(x, y, width, height)
  stage.scale = scale

  return stage
}

function calculatorContain(
  designWidth,
  designHeight,
  deviceWidth,
  deviceHeight
) {
  const scale = Math.min(deviceWidth / designWidth, deviceHeight / designHeight)

  const x = (deviceWidth / scale - designWidth) / 2
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  const stage = new Rectangle(x, y, width, height)
  stage.scale = scale

  return stage
}

function calculatorFullHeight(
  designWidth,
  designHeight,
  deviceWidth,
  deviceHeight
) {
  const scale = deviceHeight / designHeight

  const x = 0
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  const stage = new Rectangle(x, y, width, height)
  stage.scale = scale

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

export function CONTAIN(designWidth, designHeight, deviceWidth, deviceHeight) {
  return generate(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight,
    calculatorContain
  )
}

export function FULL_HEIGHT(
  designWidth,
  designHeight,
  deviceWidth,
  deviceHeight
) {
  return generate(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight,
    calculatorFullHeight
  )
}

export default {
  COVER,
  CONTAIN,
  FULL_HEIGHT,
}
