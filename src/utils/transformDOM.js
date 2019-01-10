import { FT, Device } from '#/core'

/**
 * Transform DOMElement's position and size according given DisplayObject.
 *
 * @param {DOMElement} dom the DOM to be transformed.
 * @param {DisplayObject} displayObject the display object which provides position and size.
 */
function transformDOM(dom, displayObject) {
  const scale = 1 / Device.DPR
  const { worldTransform: originalMatrix } = FT.internal.stage
  const matrix = originalMatrix.clone().scale(scale, scale)
  const { a, b, c, d, tx, ty } = matrix

  const { width, height } = displayObject
  const { x: $x, y: $y } = displayObject.getGlobalPosition()

  let $pivotX, $pivotY
  if (displayObject.anchor) {
    const { x: anchorX, y: anchorY } = displayObject.anchor
    $pivotX = width * anchorX
    $pivotY = height * anchorY
  } else {
    $pivotX = displayObject.pivot.x
    $pivotY = displayObject.pivot.y
  }

  let pivotX
  let pivotY
  if (Math.sign(c) >= 0) {
    // normal
    pivotX = $pivotX * a
    pivotY = $pivotY * d
  } else {
    // rotated
    pivotX = -$pivotX * b
    pivotY = -$pivotY * c
  }

  const stagePosition = FT.internal.stage.getGlobalPosition()
  const x = ($x - stagePosition.x) * scale - pivotX
  const y = ($y - stagePosition.y) * scale - pivotY

  dom.style.position = 'absolute'
  dom.style.width = `${width}px`
  dom.style.height = `${height}px`
  dom.style.left = `${x}px`
  dom.style.top = `${y}px`

  const transform = `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`
  const transformOrigin = '0 0 0'
  dom.style.transform = transform
  dom.style.transformOrigin = transformOrigin
  dom.style.webkitTransform = transform
  dom.style.webkitTransformOrigin = transformOrigin
}

export default transformDOM
