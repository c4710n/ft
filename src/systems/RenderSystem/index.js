import System from '../System'
import PIXI from '../../pixi'
import { UPDATE_PRIORITY } from '../../const'
import events from '../../events'

const { autoDetectRenderer } = PIXI

/**
 * System for render.
 */
class RenderSystem extends System {
  constructor(
    container,
    stage,
    {
      width = 750,
      height = 1500,
      forceCanvas = false,
      transparent = true,
      antialias = false,
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

  update() {
    this.$renderer.render(this.$stage)
  }
}

export default RenderSystem
