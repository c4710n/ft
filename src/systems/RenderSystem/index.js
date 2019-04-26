import System from '../System'
import { UPDATE_PRIORITY } from '../../const'
import { Layer } from '../../core'
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
      // enableDOMEventMode = true,
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

    // if (enableDOMEventMode) {
    //   this.enableDomEventMode()
    // }
  }

  /**
   * Resize stage.
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.renderer.resize(width, height)
    events.resize.emit()
  }

  update() {
    this.renderer.render(this.stage)
  }

  /**
   * @access private
   */
  // enableDomEventMode() {
  //   /**
  //    * Visit following link for more details.
  //    * @see https://github.com/pixijs/pixi.js/blob/v4.x/src/interaction/InteractionManager.js
  //    */

  //   const renderer = this.renderer
  //   const container = this.container
  //   const { interaction } = renderer.plugins

  //   interaction.autoPreventDefault = false
  //   interaction.setTargetElement(container, renderer.resolution)

  //   const { normalizeToPointerData } = interaction
  //   interaction.normalizeToPointerData = function(event) {
  //     this.interactionDOMElement = event.target
  //     return normalizeToPointerData.call(this, event)
  //   }

  //   const _this = this
  //   interaction.mapPositionToPoint = function(point, x, y) {
  //     // the unit of x, y is CSS pixel
  //     const resolutionMultiplier = 1.0 / this.resolution

  //     if (_this.rotate) {
  //       point.x =
  //         ((y - _this.offsetCSSY) / _this.scale) * resolutionMultiplier
  //       point.y =
  //         ((_this.offsetCSSX - x) / _this.scale) * resolutionMultiplier
  //     } else {
  //       point.x =
  //         ((x - _this.offsetCSSX) / _this.scale) * resolutionMultiplier
  //       point.y =
  //         ((y - _this.offsetCSSY) / _this.scale) * resolutionMultiplier
  //     }
  //   }
  // }
}

export default RenderSystem
