import app from '../app'
import { PIXI, Layer } from '../core'
import { transformDOM } from '../utils'

const { Sprite, Texture } = PIXI

/**
 * Create a DOM element.
 */
class DOM extends Sprite {
  constructor(tag = 'div', { layer = Layer.DOM_INTERACTION } = {}) {
    super(Texture.EMPTY)

    this.layer = layer
    this.dom = document.createElement(tag)
  }

  onAdded() {
    app.container.appendChild(this.dom)
  }

  onRemoved() {
    app.container.removeChild(this.dom)
  }

  onUpdate() {
    const { layer } = this
    this.renderDOM(layer)
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
