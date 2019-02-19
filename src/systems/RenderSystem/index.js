import PIXI from '#/pixi'
import { FT, Device, Layer } from '#/core'
import { classname } from '#/utils'
import { UPDATE_PRIORITY } from '#/const'
import System from '../System'
import ScaleMode from './ScaleMode'

const { autoDetectRenderer, utils } = PIXI

// keep quiet!
utils.skipHello()

/**
 * System for render.
 */
class RenderSystem extends System {
  constructor(
    container,
    stage,
    { width, height, scaleMode, eventMode = 'canvas' } = {}
  ) {
    super(UPDATE_PRIORITY.LOW)

    const renderer = autoDetectRenderer({
      transparent: false,
      antialias: false,
    })
    container.appendChild(renderer.view)

    /**
     * @access private
     */
    this.$renderer = renderer

    /**
     * @access private
     */
    this.$view = renderer.view

    /**
     * @access private
     */
    this.$stage = stage

    /**
     * @access private
     */
    this.$designWidth = width

    /**
     * @access private
     */
    this.$designHeight = height

    /**
     * @access private
     */
    this.$scaleMode = scaleMode

    if (eventMode === 'dom') {
      this.enableDomEventMode()
    }

    window.addEventListener('resize', this.onResize.bind(this))
    this.onResize()
  }

  /**
   * Resize stage.
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.$designWidth = width
    this.$designHeight = height

    this.onResize()
  }

  /**
   * @access private
   */
  onResize() {
    const { width: deviceWidth, height: deviceHeight } = Device.size.clone()

    const mode = this.$scaleMode
    const scale = ScaleMode[mode]
    if (!scale) {
      throw new Error(`[${classname(this)}] unsupported scale mode - ${mode}`)
    }

    const { stage, viewport, shouldRotate } = scale(
      this.$designWidth,
      this.$designHeight,
      deviceWidth,
      deviceHeight
    )

    this.$view.style.zIndex = Layer.VIEW
    this.$view.style.position = 'absolute'

    const viewportWidth = Math.round(Device.size.width)
    const viewportHeight = Math.round(Device.size.height)
    const viewportCSSWidth = Math.round(Device.cssSize.width)
    const viewportCSSHeight = Math.round(Device.cssSize.height)
    this.$view.style.width = `${viewportCSSWidth}px`
    this.$view.style.height = `${viewportCSSHeight}px`
    this.$renderer.resize(viewportWidth, viewportHeight)

    this.$stage.scale.set(stage.scale)
    const x = stage.x * stage.scale
    const y = stage.y * stage.scale

    if (shouldRotate) {
      this.$stage.rotation = 0.5 * Math.PI
      this.$stage.x = viewportWidth - y
      this.$stage.y = x

      FT.rotated = true
    } else {
      this.$stage.rotation = 0
      this.$stage.x = x
      this.$stage.y = y

      FT.rotated = false
    }

    FT.stage = stage
    FT.viewport = viewport
  }

  /**
   * @access private
   */
  enableDomEventMode() {
    /**
     * Visit following link for more details.
     * @see https://github.com/pixijs/pixi.js/blob/v4.x/src/interaction/InteractionManager.js
     */
    const renderer = this.$renderer
    const { interaction } = renderer.plugins
    const interactiveTarget = document.body
    interaction.setTargetElement(interactiveTarget, renderer.resolution)

    const { normalizeToPointerData } = interaction
    interaction.normalizeToPointerData = function(event) {
      /**
       * @ignore
       */
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }

    interaction.mapPositionToPoint = function(
      point,
      // the unit of x, y is CSS pixel
      x,
      y
    ) {
      const rect = interactiveTarget.getBoundingClientRect()
      const resolutionMultiplier = 1.0 / this.resolution

      point.x = (x - rect.left) * Device.DPR * resolutionMultiplier
      point.y = (y - rect.top) * Device.DPR * resolutionMultiplier
    }
  }

  update() {
    this.$renderer.render(this.$stage)
  }
}

export default RenderSystem
