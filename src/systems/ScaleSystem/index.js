import { FT, Layer } from '../../core'
import PIXI from '../../pixi'
import { classname } from '../../utils'
import { UPDATE_PRIORITY } from '../../const'
import System from '../System'
import ScaleMode from './ScaleMode'
import events from '../../events'

const { autoDetectRenderer, utils } = PIXI

// keep quiet!
utils.skipHello()

/**
 * System for render.
 */
class ScaleSystem extends System {
  constructor(
    container,
    stage,
    {
      width = 750,
      height = 1500,
      forceCanvas = false,
      transparent = true,
      antialias = false,
      scaleMode = 'COVER',
      enableDOMEventMode = true,
    } = {}
  ) {
    super(UPDATE_PRIORITY.LOW)

    const renderer = autoDetectRenderer({
      width,
      height,
      forceCanvas,
      transparent,
      antialias,
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

    if (enableDOMEventMode) {
      this.enableDomEventMode()
    }

    events.resize.on(({ width, height }) => {
      this.onResize(width, height)
    }, this)
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

    events.resize.emit()
  }

  /**
   * @access private
   */
  onResize(viewportCSSWidth, viewportCSSHeight) {
    const gameWidth = this.$gameWidth
    const gameHeight = this.$gameHeight

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
      const baseOffsetCSSY = viewport.cssHeight

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
      center: [gameWidth / 2, gameHeight / 2],
    }

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
    const container = this.$container
    const { interaction } = renderer.plugins

    interaction.autoPreventDefault = false
    interaction.setTargetElement(container, renderer.resolution)

    const { normalizeToPointerData } = interaction
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }

    const _this = this
    interaction.mapPositionToPoint = function(point, x, y) {
      // the unit of x, y is CSS pixel
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

export default ScaleSystem
