import { FT } from '../core'

/**
 * Transform DOMElement's position and size according given DisplayObject.
 *
 * @param {DOMElement} dom the DOM to be transformed.
 * @param {DisplayObject} displayObject the display object which provides position and size.
 */
function transformDOM(dom, displayObject, layer) {
  const { width, height } = displayObject

  const { x: $x, y: $y } = displayObject.getGlobalPosition()

  let pivotX, pivotY
  if (displayObject.anchor) {
    const { x: anchorX, y: anchorY } = displayObject.anchor
    pivotX = width * anchorX
    pivotY = height * anchorY
  } else {
    pivotX = displayObject.pivot.x
    pivotY = displayObject.pivot.y
  }

  const stagePosition = FT.stage.getGlobalPosition()
  const x = $x - stagePosition.x - pivotX
  const y = $y - stagePosition.y - pivotY

  dom.style.position = 'absolute'
  dom.style.width = `${width}px`
  dom.style.height = `${height}px`
  dom.style.left = `${x}px`
  dom.style.top = `${y}px`
  dom.style.zIndex = layer
}

export default transformDOM
