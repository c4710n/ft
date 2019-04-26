import System from '../System'
import modes from './modes'
import events from '../../events'
import { FT } from '../../core'
import { classname } from '../../utils'

/**
 * System for render.
 */
class ScaleSystem extends System {
  constructor(
    container,
    { width = 750, height = 1500, scaleMode = 'COVER' } = {}
  ) {
    super('scale')

    /**
     * @access private
     */
    this.$container = container

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
    this.mode = scaleMode

    events.resize.on(({ width, height }) => {
      this.onResize(width, height)
    }, this)
  }

  /**
   * @access private
   */
  onResize(viewportCSSWidth, viewportCSSHeight) {
    const gameWidth = this.$gameWidth
    const gameHeight = this.$gameHeight

    const { mode } = this
    const scaleMode = modes[mode]

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

    FT.stage = {
      width: gameWidth,
      height: gameHeight,
      centerX: gameWidth / 2,
      centerY: gameHeight / 2,
      center: [gameWidth / 2, gameHeight / 2],
    }

    FT.viewport = viewport
  }
}

export default ScaleSystem
