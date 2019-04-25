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
    FT.container.appendChild(this.dom)
  }

  onRemoved() {
    FT.container.removeChild(this.dom)
  }

  onUpdate() {
    this.renderDOM()
  }

  /**
   * @ignore
   */
  renderDOM = () => {
    const dom = this.dom
    const displayObject = this

    transformDOM(dom, displayObject, Layer.DOM_INTERACTION)
  }
}

export default DOM
