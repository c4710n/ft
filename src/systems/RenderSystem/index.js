import FT from '#/core/FT'
import PIXI from '#/pixi'
import { Device, Layer } from '#/core'
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
    this.$container = container

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
    this.$gameWidth = width

    /**
     * @access private
     */
    this.$gameHeight = height

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
    this.$gameWidth = width
    this.$gameHeight = height

    this.onResize()
  }

  /**
   * @access private
   */
  onResize() {
    const gameWidth = this.$gameWidth
    const gameHeight = this.$gameHeight
    const {
      width: viewportCSSWidth,
      height: viewportCSSHeight,
    } = Device.cssSize.clone()

    const mode = this.$scaleMode
    const scaleMode = ScaleMode[mode]

    if (!scaleMode) {
      throw new Error(`[${classname(this)}] unsupported scale mode - ${mode}`)
    }

    const { game, viewport, shouldRotate } = scaleMode(
      gameWidth,
      gameHeight,
      viewportCSSWidth,
      viewportCSSHeight
    )

    let { scale, offsetCSSX, offsetCSSY } = game
    let rotation = 0

    if (shouldRotate) {
      rotation = 90
      const baseOffsetCSSX = 0
      const baseOffsetCSSY = viewport.height

      offsetCSSX = baseOffsetCSSX + offsetCSSX
      offsetCSSY = baseOffsetCSSY - offsetCSSY
      ;[offsetCSSX, offsetCSSY] = [offsetCSSY, offsetCSSX]
    }

    this.$offsetCSSX = offsetCSSX
    this.$offsetCSSY = offsetCSSY
    this.$scale = scale
    this.$rotate = shouldRotate

    this.$container.style.position = 'absolute'
    this.$container.style.width = `${gameWidth}px`
    this.$container.style.height = `${gameHeight}px`
    this.$container.style.transformOrigin = '0 0'
    this.$container.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${offsetCSSX}, ${offsetCSSY}) rotate(${rotation}deg)`

    this.$view.style.zIndex = Layer.VIEW
    this.$view.style.position = 'absolute'
    this.$view.style.width = '100%'
    this.$view.style.height = '100%'

    this.$renderer.resize(gameWidth, gameHeight)

    FT.stage = {
      width: gameWidth,
      height: gameHeight,
      centerX: gameWidth / 2,
      centerY: gameHeight / 2,
    }
  }

  /**
   * @access private
   */
  enableDomEventMode() {
    /**
     * Visit following link for more details.
     * @see https://github.com/pixijs/pixi.js/blob/v4.x/src/interaction/InteractionManager.js
     */
    const _this = this

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
      const resolutionMultiplier = 1.0 / this.resolution
      if (_this.$rotate) {
        point.x =
          ((y - _this.$offsetCSSY) / _this.$scale) * resolutionMultiplier
        point.y =
          ((_this.$offsetCSSX - x) / _this.$scale) * resolutionMultiplier
      } else {
        point.x =
          ((x - _this.$offsetCSSX) / _this.$scale) * resolutionMultiplier
        point.y =
          ((y - _this.$offsetCSSY) / _this.$scale) * resolutionMultiplier
      }
    }
  }

  update() {
    this.$renderer.render(this.$stage)
  }
}

export default RenderSystem
