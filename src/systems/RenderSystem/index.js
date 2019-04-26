import System from '../System'
import { UPDATE_PRIORITY } from '../../const'
import { FT, Layer } from '../../core'
import PIXI from '../../pixi'
import events from '../../events'

const { autoDetectRenderer, Container } = PIXI

/**
 * System for render.
 */
class RenderSystem extends System {
  constructor(
    container,
    {
      width = 750,
      height = 1500,
      forceCanvas = false,
      transparent = true,
      antialias = false,
      enableDOMEventMode = true,
    } = {}
  ) {
    super('render', UPDATE_PRIORITY.LOW)

    /**
     * @access private
     */
    this.container = container

    /**
     * @access private
     */
    this.width = width

    /**
     * @access private
     */
    this.height = height

    /**
     * @access private
     */
    this.renderer = autoDetectRenderer({
      width,
      height,
      forceCanvas,
      transparent,
      antialias,
    })

    /**
     * @access private
     */
    this.view = this.renderer.view
    this.view.style.zIndex = Layer.VIEW
    this.view.style.position = 'absolute'
    this.view.style.width = '100%'
    this.view.style.height = '100%'

    /**
     * @access private
     */
    this.stage = new Container()
    this.stage.added = true // in order to make patchDisplayObjectLifecycle work.

    /**
     * Add view to DOM tree.
     */
    container.appendChild(this.view)

    if (enableDOMEventMode) {
      this.enableDomEventMode()
    }
  }

  /**
   * Resize stage.
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.width = width
    this.height = height

    this.renderer.resize(width, height)
    events.resize.emit()
  }

  update() {
    this.renderer.render(this.stage)
  }

  /**
   * @access private
   */
  enableDomEventMode() {
    /**
     * Visit following link for more details.
     * @see https://github.com/pixijs/pixi.js/blob/v4.x/src/interaction/InteractionManager.js
     */

    const { container, renderer } = this

    const { interaction } = renderer.plugins
    interaction.autoPreventDefault = false
    interaction.setTargetElement(container, renderer.resolution)

    const { normalizeToPointerData } = interaction
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }

    interaction.mapPositionToPoint = function(point, x, y) {
      const { offsetCSSX, offsetCSSY, scale } = FT.systems.scale.position
      const rotate = FT.systems.scale.rotate

      // the unit of x, y is CSS pixel
      const resolutionMultiplier = 1.0 / this.resolution

      if (rotate) {
        point.x = ((y - offsetCSSY) / scale) * resolutionMultiplier
        point.y = ((offsetCSSX - x) / scale) * resolutionMultiplier
      } else {
        point.x = ((x - offsetCSSX) / scale) * resolutionMultiplier
        point.y = ((y - offsetCSSY) / scale) * resolutionMultiplier
      }
    }
  }
}

export default RenderSystem
