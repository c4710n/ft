import System, { UPDATE_PRIORITY } from '../System'
import { FT, Layer } from '../../core'
import PIXI from '../../pixi'
import 'pixi-spine'
import events from '../../events'

const { autoDetectRenderer, Container } = PIXI

class RenderSystem extends System {
  constructor(
    container,
    {
      width = 750,
      height = 1500,
      forceCanvas = false,
      transparent = true,
      antialias = false,
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
    this.size = this.getSize()

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

    this.remapInteraction()
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

    this.updateSize()
    this.renderer.resize(width, height)
    events.resize.emit()
  }

  getSize() {
    const { width, height } = this

    return {
      width: width,
      height: height,
      centerX: width / 2,
      centerY: height / 2,
      center: [width / 2, height / 2],
    }
  }

  updateSize() {
    const { width, height } = this
    this.size.width = width
    this.size.height = height
    this.size.centerX = width / 2
    this.size.centerY = height / 2
    this.size.center = [width / 2, height / 2]
  }

  update() {
    this.renderer.render(this.stage)
  }

  /**
   * @access private
   */
  remapInteraction() {
    /**
     * Visit following link for more details.
     * @see https://github.com/pixijs/pixi.js/blob/dev/packages/interaction/src/InteractionManager.js
     */
    const { container, renderer } = this
    const { interaction } = renderer.plugins
    const { normalizeToPointerData } = interaction

    interaction.setTargetElement(container, renderer.resolution)
    // interaction.autoPreventDefault = false
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }
    interaction.mapPositionToPoint = function(point, x, y) {
      const { scale } = FT.systems.scale.position
      const rotate = FT.systems.scale.rotate

      // the unit of x, y is CSS pixel
      const resolutionMultiplier = 1.0 / this.resolution

      const rect = container.getBoundingClientRect()

      if (rotate) {
        point.x = ((y - rect.y) / scale) * resolutionMultiplier
        point.y = ((rect.width - (x - rect.x)) / scale) * resolutionMultiplier
      } else {
        point.x = ((x - rect.x) / scale) * resolutionMultiplier
        point.y = ((y - rect.y) / scale) * resolutionMultiplier
      }
    }
  }
}

export default RenderSystem
