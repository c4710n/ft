import { Orientation } from '#/core'

function getGameOrientation(width, height) {
  return width >= height ? Orientation.LANDSCAPE : Orientation.PORTRAIT
}

function getViewportOrientation(width, height) {
  return width >= height ? Orientation.LANDSCAPE : Orientation.PORTRAIT
}

function isOrientationMatched(
  gameWidth,
  gameHeight,
  viewportCSSWidth,
  viewportCSSHeight
) {
  return (
    getGameOrientation(gameWidth, gameHeight) ===
    getViewportOrientation(viewportCSSWidth, viewportCSSHeight)
  )
}

function generate(
  gameWidth,
  gameHeight,
  viewportCSSWidth,
  viewportCSSHeight,
  calcFunction
) {
  const shouldRotate = !isOrientationMatched(
    gameWidth,
    gameHeight,
    viewportCSSWidth,
    viewportCSSHeight
  )

  if (shouldRotate) {
    ;[viewportCSSWidth, viewportCSSHeight] = [
      viewportCSSHeight,
      viewportCSSWidth,
    ]
  }

  const viewport = {
    width: viewportCSSWidth,
    height: viewportCSSHeight,
  }

  const game = calcFunction(
    gameWidth,
    gameHeight,
    viewportCSSWidth,
    viewportCSSHeight
  )

  return {
    game,
    viewport,
    shouldRotate,
  }
}

function calcCover(gameWidth, gameHeight, viewportCSSWidth, viewportCSSHeight) {
  const scale = Math.max(
    viewportCSSWidth / gameWidth,
    viewportCSSHeight / gameHeight
  )

  const offsetCSSX = (viewportCSSWidth - gameWidth * scale) / 2
  const offsetCSSY = (viewportCSSHeight - gameHeight * scale) / 2

  return { scale, offsetCSSX, offsetCSSY }
}

function calcContain(
  gameWidth,
  gameHeight,
  viewportCSSWidth,
  viewportCSSHeight
) {
  const scale = Math.min(
    viewportCSSWidth / gameWidth,
    viewportCSSHeight / gameHeight
  )

  const offsetCSSX = (viewportCSSWidth - gameWidth * scale) / 2
  const offsetCSSY = (viewportCSSHeight - gameHeight * scale) / 2
  return { scale, offsetCSSX, offsetCSSY }
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

export default {
  COVER,
  CONTAIN,
}
