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

  const position = calcFunction(
    width,
    height,
    viewportCSSWidth,
    viewportCSSHeight
  )
  const { scale, offsetCSSX, offsetCSSY } = position

  let boundsLeft
  let boundsRight
  let boundsTop
  let boundsBottom
  let boundsWidth
  let boundsHeight
  if (offsetCSSX >= 0) {
    boundsLeft = 0
    boundsRight = width
    boundsWidth = width
  } else {
    boundsLeft = -offsetCSSX / scale
    boundsRight = (viewportCSSWidth - offsetCSSX) / scale
    boundsWidth = viewportCSSWidth / scale
  }

  if (offsetCSSY >= 0) {
    boundsTop = 0
    boundsBottom = height
    boundsHeight = height
  } else {
    boundsTop = -offsetCSSY / scale
    boundsBottom = (viewportCSSHeight - offsetCSSY) / scale
    boundsHeight = viewportCSSHeight / scale
  }

  const bounds = {
    left: boundsLeft,
    right: boundsRight,
    top: boundsTop,
    bottom: boundsBottom,
    width: boundsWidth,
    height: boundsHeight,
  }

  const viewport = {
    cssWidth: viewportCSSWidth,
    cssHeight: viewportCSSHeight,
  }

  return {
    shouldRotate,
    position,
    bounds,
    viewport,
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
