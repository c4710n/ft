import app from '../app'
import { PIXI, Layer } from '../core'
import { transformDOM } from '../util'

const { Sprite, Texture } = PIXI

/**
 * Create a DOM element.
 */
class DOM extends Sprite {
  constructor(tag = 'div', { layer = Layer.DOM_INTERACTION } = {}) {
    super(Texture.EMPTY)

    this.layer = layer
    this.dom = document.createElement(tag)
    this.skipFirstUpdate = false
  }

  onAdded() {
    // hide dom for now.
    // renderDOM will give it right opacity later.
    this.dom.style.opacity = 0
    app.container.appendChild(this.dom)
  }

  onRemoved() {
    if (this.dom.parentElement) {
      app.container.removeChild(this.dom)
    }
  }

  onUpdate() {
    if (!this.skipFirstUpdate) {
      this.skipFirstUpdate = true
      return
    }

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
