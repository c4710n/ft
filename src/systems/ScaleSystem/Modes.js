import ORIENTATION from './ORIENTATION'

function getGameOrientation(width, height) {
  return width >= height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT
}

function getViewportOrientation(width, height) {
  return width >= height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT
}

function isOrientationMatched(
  width,
  height,
  viewportCSSWidth,
  viewportCSSHeight
) {
  return (
    getGameOrientation(width, height) ===
    getViewportOrientation(viewportCSSWidth, viewportCSSHeight)
  )
}

function generate(
  width,
  height,
  viewportCSSWidth,
  viewportCSSHeight,
  calcFunction
) {
  const shouldRotate = !isOrientationMatched(
    width,
    height,
    viewportCSSWidth,
    viewportCSSHeight
  )

  if (shouldRotate) {
    ;[viewportCSSWidth, viewportCSSHeight] = [
      viewportCSSHeight,
      viewportCSSWidth,
    ]
  }

  const game = calcFunction(width, height, viewportCSSWidth, viewportCSSHeight)

  const { scale, offsetCSSX, offsetCSSY } = game

  const viewportLeftBounds = -offsetCSSX / scale
  const viewportRightBounds = (viewportCSSWidth - offsetCSSX) / scale
  const viewportTopBounds = -offsetCSSY / scale
  const viewportBottomBounds = (viewportCSSHeight - offsetCSSY) / scale

  const viewport = {
    left: viewportLeftBounds,
    right: viewportRightBounds,
    top: viewportTopBounds,
    bottom: viewportBottomBounds,
    cssWidth: viewportCSSWidth,
    cssHeight: viewportCSSHeight,
  }

  return {
    game,
    viewport,
    shouldRotate,
  }
}

function calcCover(width, height, viewportCSSWidth, viewportCSSHeight) {
  const scale = Math.max(viewportCSSWidth / width, viewportCSSHeight / height)

  const offsetCSSX = (viewportCSSWidth - width * scale) / 2
  const offsetCSSY = (viewportCSSHeight - height * scale) / 2

  return { scale, offsetCSSX, offsetCSSY }
}

function calcContain(width, height, viewportCSSWidth, viewportCSSHeight) {
  const scale = Math.min(viewportCSSWidth / width, viewportCSSHeight / height)

  const offsetCSSX = (viewportCSSWidth - width * scale) / 2
  const offsetCSSY = (viewportCSSHeight - height * scale) / 2
  return { scale, offsetCSSX, offsetCSSY }
}

export function COVER(width, height, viewportCSSWidth, viewportCSSHeight) {
  return generate(width, height, viewportCSSWidth, viewportCSSHeight, calcCover)
}

export function CONTAIN(width, height, viewportCSSWidth, viewportCSSHeight) {
  return generate(
    width,
    height,
    viewportCSSWidth,
    viewportCSSHeight,
    calcContain
  )
}

export default {
  COVER,
  CONTAIN,
}
