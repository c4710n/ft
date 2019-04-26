import patch from '../patch'
import PIXI from '../pixi'
import { Factory as DisplayFactory } from '../display'
import ResManager from '../res/ResManager'
import SceneManager from '../scene/SceneManager'
import events from '../events'
import {
  RenderSystem,
  ScaleSystem,
  TweenSystem,
  WidgetSystem,
  VisibilitySystem,
} from '../systems'

patch()

const defaultOptions = {
  backgroundColor: '#ffffff',
}

function createContainer(selector, { disableScroll = true } = {}) {
  const container = document.querySelector(selector)
  if (!container) {
    throw new Error(`[FT] invalid selector of container`)
  }

  container.style.userSelect = 'none'
  container.style.touchAction = 'none'
  container.style.cursor = 'auto'
  container.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)'

  if (disableScroll) {
    document.body.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )

    document.body.addEventListener(
      'scroll',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

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
    this.systems = {}
    /**
     * place to store conflict variables.
     */
    this.internal = {}

    /**
     * ticker for game loop.
     */
    this.ticker = new PIXI.Ticker()

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
     * helper for creating DisplayObject faster.
     */
    this.create = DisplayFactory.create
  }

  /**
   * Prepare for start.
   *
   * @param {string} selector - selector of DOM container.
   * @param {Object} options
   * @param {number} [options.renderer] - renderer's default options.
   * @param {string} [options.backgroundColor='#ffffff'] - background of DOM container.
   */
  init(selector, options) {
    const { backgroundColor } = Object.assign(defaultOptions, options)

    const container = createContainer(selector)
    this.container = container
    this.backgroundColor = backgroundColor

    const renderSystem = new RenderSystem(container, options.render)
    this.renderSystem = renderSystem
    this.internal.stage = renderSystem.stage

    this.addSystem(renderSystem)
    this.addSystem(new TweenSystem())
    this.addSystem(new WidgetSystem())
    this.addSystem(new VisibilitySystem())
    this.addSystem(new ScaleSystem(container, options.scale))
    this.enqueueSystems()

    events.start()
  }

  /**
   * @access private
   */
  addSystem(system) {
    this.systems[system.name] = system
  }

  /**
   * @access private
   */
  enqueueSystems() {
    const systems = Object.values(this.systems)

    for (const system of systems) {
      this.ticker.add(system.update, system, system.updatePriority)
    }
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
   * resize stage after initialization.
   */
  resizeStage(...args) {
    this.renderSystem.resize(...args)
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
