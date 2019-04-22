import { FT, Layer } from '#/core'
import { transformDOM } from '#/utils'
import PIXI from '#/pixi'

const { WHITE } = PIXI.Texture

/**
 * Create a DOM element with same size of given displayObject.
 *
 * @example
 * const sprite = new Sprite()
 * const cover = FT.create(DomMirror, sprite, { tag: 'img'})
 * cover.dom.src = '<valid dataURL>'
 * this.addChild(cover)
 */
class DOM extends PIXI.Sprite {
  constructor(tag = 'div', { debug = false, enableLifecycle = true } = {}) {
    super(WHITE)
    this.alpha = 0

    const dom = document.createElement(tag)

    /**
     * @access private
     */
    this.$dom = dom

    /**
     * @access private
     */
    this.$debug = debug

    /**
     * @access private
     */
    this.$enableLifecycle = enableLifecycle
  }

  onAdded() {
    if (this.$enableLifecycle) {
      FT.container.appendChild(this.$dom)
    }
  }

  onRemoved() {
    if (this.$enableLifecycle) {
      FT.container.removeChild(this.$dom)
    }
  }

  onUpdate() {
    this.renderDOM()
  }

  get dom() {
    return this.$dom
  }

  transformDOM() {
    const dom = this.$dom
    const displayObject = this

    transformDOM(dom, displayObject)
  }

  /**
   * @ignore
   */
  renderDOM = () => {
    const dom = this.$dom
    dom.style.zIndex = Layer.DOM_INTERACTION
    this.transformDOM(dom)

    if (this.$debug) {
      dom.style.backgroundColor = '#ff0000'
      dom.style.opacity = 0.2
    }
  }
}

export default DOM
