import { FT, Device, Layer } from '#/core'
import PIXI from '#/pixi'

/**
 * Create a DOM element with same size of given displayObject.
 *
 * @example
 * const sprite = new Sprite()
 * const cover = FT.create(DomMirror, sprite, { tag: 'img'})
 * cover.dom.src = '<valid dataURL>'
 * this.addChild(cover)
 */
class DomMirror extends PIXI.Container {
  constructor(displayObject, { tag = 'div', debug = false } = {}) {
    super()

    const dom = document.createElement(tag)

    /**
     * @access private
     */
    this.$dom = dom

    /**
     * @access private
     */
    this.$displayObject = displayObject

    /**
     * @access private
     */
    this.$debug = debug
  }

  onAdded() {
    FT.container.appendChild(this.$dom)
  }

  onRemoved() {
    FT.container.removeChild(this.$dom)
  }

  onUpdate() {
    this.position()
  }

  get dom() {
    return this.$dom
  }

  /**
   * @ignore
   */
  position = () => {
    const dom = this.$dom
    const displayObject = this.$displayObject

    const scale = 1 / Device.DPR
    const { worldTransform: originalMatrix } = FT.internal.stage
    const matrix = originalMatrix.clone().scale(scale, scale)
    const { a, b, c, d, tx, ty } = matrix

    const { width, height } = displayObject

    const stagePosition = FT.internal.stage.getGlobalPosition()
    const displayObjectPosition = displayObject.getGlobalPosition()

    const { x: anchorX, y: anchorY } = displayObject.anchor
    let pivotX, pivotY

    if (Math.sign(c) >= 0) {
      // normal
      pivotX = width * anchorX * a
      pivotY = height * anchorY * d
    } else {
      // rotated
      pivotX = -width * anchorX * b
      pivotY = -height * anchorY * c
    }

    const x = (displayObjectPosition.x - stagePosition.x) * scale - pivotX
    const y = (displayObjectPosition.y - stagePosition.y) * scale - pivotY

    dom.style.zIndex = Layer.DOM_INTERACTION
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

    if (this.$debug) {
      dom.style.backgroundColor = '#ff0000'
      dom.style.opacity = 0.2
    } else {
      dom.style.opacity = 0.0001
    }
  }
}

export default DomMirror
