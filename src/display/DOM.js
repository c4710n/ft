import { FT, Layer } from '../core'
import { transformDOM } from '../utils'
import PIXI from '../pixi'

const { Sprite, Texture } = PIXI

/**
 * Create a DOM element.
 */
class DOM extends Sprite {
  constructor(tag = 'div') {
    super(Texture.WHITE)
    this.alpha = 0

    /**
     * @access private
     */
    this.dom = document.createElement(tag)
  }

  onAdded() {
    FT.container.dom.appendChild(this.dom)
  }

  onRemoved() {
    FT.container.dom.removeChild(this.dom)
  }

  onUpdate() {
    this.renderDOM(Layer.DOM_INTERACTION)
  }

  /**
   * @ignore
   */
  renderDOM(layer) {
    const dom = this.dom
    const displayObject = this

    transformDOM(dom, displayObject, layer)
  }
}

export default DOM
