import app from '../../app'
import System, { UPDATE_PRIORITY } from '../System'
import { Layer, PIXI } from '../../core'
import events from '../../events'

class RenderSystem extends System {
  constructor({
    width = 750,
    height = 1500,
    forceCanvas = false,
    transparent = true,
    antialias = false,
  } = {}) {
    super('render', UPDATE_PRIORITY.LOW)

    this.container = app.container

    this.width = width
    this.height = height
    this.size = this.getSize()
    app.size = this.size

    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      forceCanvas,
      transparent,
      antialias,
    })
    app.renderer = this.renderer

    this.view = this.renderer.view
    this.view.style.zIndex = Layer.VIEW
    this.view.style.position = 'absolute'
    this.view.style.width = '100%'
    this.view.style.height = '100%'
    app.view = this.view

    this.stage = app.stage
    this.stage.added = true // in order to make patchDisplayObjectLifecycle work.

    this.container.appendChild(this.view)
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
    const { stage, renderer } = this

    // render stage
    renderer.render(stage)
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
    interaction.autoPreventDefault = false
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }
    interaction.mapPositionToPoint = function(point, x, y) {
      const { scale } = app.systems.scale.position
      const rotate = app.systems.scale.rotate

      // the unit of x, y is CSS pixel
      const resolutionMultiplier = 1.0 / this.resolution

      const rect = container.getBoundingClientRect()

      if (rotate) {
        point.x = ((y - rect.top) / scale) * resolutionMultiplier
        point.y =
          ((rect.width - (x - rect.left)) / scale) * resolutionMultiplier
      } else {
        point.x = ((x - rect.left) / scale) * resolutionMultiplier
        point.y = ((y - rect.top) / scale) * resolutionMultiplier
      }
    }
  }
}

export default RenderSystem
