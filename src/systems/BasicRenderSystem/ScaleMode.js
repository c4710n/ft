import PIXI from '#/pixi'
import { Orientation } from '#/core'

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
  calcFunction
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

  const stageSize = calcFunction(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight
  )
  const { x, y, width, height, scale } = stageSize
  const stage = new Rectangle(x, y, width, height)
  stage.scale = scale

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

  const viewport = new Rectangle(
    -stage.x,
    -stage.y,
    deviceWidth / scale,
    deviceHeight / scale
  )

  const values = {
    stage,
    viewport,
    shouldRotate,
  }

  return values
}

function calcCover(designWidth, designHeight, deviceWidth, deviceHeight) {
  const scale = Math.max(deviceWidth / designWidth, deviceHeight / designHeight)

  const x = (deviceWidth / scale - designWidth) / 2
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  return { scale, x, y, width, height }
}

function calcContain(designWidth, designHeight, deviceWidth, deviceHeight) {
  const scale = Math.min(deviceWidth / designWidth, deviceHeight / designHeight)

  const x = (deviceWidth / scale - designWidth) / 2
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  return { scale, x, y, width, height }
}

function calcFullHeight(designWidth, designHeight, deviceWidth, deviceHeight) {
  const scale = deviceHeight / designHeight

  const x = 0
  const y = (deviceHeight / scale - designHeight) / 2
  const width = designWidth
  const height = designHeight

  return { scale, x, y, width, height }
}

export function COVER(designWidth, designHeight, deviceWidth, deviceHeight) {
  return generate(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight,
    calcCover
  )
}

export function CONTAIN(designWidth, designHeight, deviceWidth, deviceHeight) {
  return generate(
    designWidth,
    designHeight,
    deviceWidth,
    deviceHeight,
    calcContain
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
    calcFullHeight
  )
}

export default {
  COVER,
  CONTAIN,
  FULL_HEIGHT,
}
