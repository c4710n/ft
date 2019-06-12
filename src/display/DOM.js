import app from '../app'
import { PIXI, Layer } from '../core'
import { transformDOM } from '../utils'

const { Sprite, Texture } = PIXI

/**
 * Create a DOM element.
 */
class DOM extends Sprite {
  constructor(tag = 'div') {
    super(Texture.EMPTY)
    this.alpha = 1

    /**
     * @access private
     */
    this.dom = document.createElement(tag)
  }

  onAdded() {
    app.container.appendChild(this.dom)
  }

  onRemoved() {
    app.container.removeChild(this.dom)
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
