import patch from '#/patch'
import PIXI from '#/pixi'
import ResManager from '#/res/ResManager'
import SceneManager from '#/scene/SceneManager'
import { TweenSystem, WidgetSystem, BasicRenderSystem } from '#/systems'

const defaultOptions = {
  width: 750,
  height: 1500,
  scaleMode: 'COVER',
  backgroundColor: '#ffffff',
}

function createContainer(selector) {
  const container = document.querySelector(selector)
  if (!container) {
    throw new Error(`[FT] invalid selector of container`)
  }

  container.style.userSelect = 'none'
  container.style.touchAction = 'none'
  container.style.cursor = 'auto'
  container.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)'

  return container
}

/**
 * Commander for framework.
 */
class FT {
  constructor() {
    window.FT = this

    /**
     * @ignore
     */
    this.$systems = []
    /**
     * @ignore
     */
    this.$updates = 0

    /**
     * place to store conflict variables.
     */
    this.internal = {}

    /**
     * ticker for game loop.
     */
    this.ticker = new PIXI.ticker.Ticker()

    /**
     * DOM container of FT's canvas.
     */
    this.container = null

    /**
     * default instance of ResManager.
     */
    this.rm = ResManager.default

    /**
     * default instance of SceneManager.
     */
    this.sm = SceneManager.default

    /**
     * helper for extending PIXI's classes.
     */
    this.create = patch.createDisplayObject
  }

  /**
   * Prepare for start.
   *
   * @param {string} selector - selector of DOM container.
   * @param {Object} options
   * @param {number} [options.width=750] - stage's width.
   * @param {number} [options.height=1500] - stage's height.
   * @param {string} [options.scaleMode='COVER'] - stage's scale mode.
   * @param {string} [options.backgroundColor='#ffffff'] - background of DOM container.
   */
  init(selector, options) {
    const { width, height, scaleMode, backgroundColor } = Object.assign(
      defaultOptions,
      options
    )

    const container = createContainer(selector)
    this.container = container
    this.backgroundColor = backgroundColor

    const stage = new PIXI.Container()
    this.internal.stage = stage

    this.addSystem(new TweenSystem())
    this.addSystem(new WidgetSystem())

    const scaleOptions = {
      width,
      height,
      mode: scaleMode,
    }
    this.addSystem(new BasicRenderSystem(container, stage, scaleOptions))

    this.ticker.add(dt => {
      this.update(dt)
    })
  }

  /**
   * @access private
   */
  addSystem(system) {
    this.$systems.push(system)
  }

  /**
   * @access private
   */
  update(dt) {
    for (const system of this.$systems) {
      if (this.$updates % system.frequency > 0) {
        break
      }

      system.update(dt)
    }

    this.$updates += 1
  }

  /**
   * start ticker.
   */
  start() {
    this.ticker.start()
  }

  /**
   * stop ticker.
   */
  stop() {
    this.ticker.stop()
  }

  /**
   * setter for background color of DOM container.
   */
  set backgroundColor(color) {
    this.container.style.backgroundColor = color
  }
}

/**
 * The global single instance of FT.
 */
const ft = new FT()

export default ft
