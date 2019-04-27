import patch from '../patch'
import PIXI from '../pixi'
import {
  RenderSystem,
  HUDSystem,
  TweenSystem,
  ScaleSystem,
  SoundSystem,
  VisibilitySystem,
} from '../systems'
import Container from './Container'
import { Factory as DisplayFactory } from '../display'
import ResManager from '../res/ResManager'
import SceneManager from '../scene/SceneManager'
import events from '../events'

patch()

const { Ticker } = PIXI

/**
 * Commander for framework.
 */
class FT {
  constructor() {
    window.FT = this

    /**
     * DOM container of FT's canvas.
     */
    this.container = null

    /**
     * ticker for game loop.
     */
    this.ticker = new Ticker()

    /**
     * @ignore
     */
    this.systems = {}

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
    const container = new Container(selector, options.container)

    this.addSystem(new RenderSystem(container.dom, options.render))
    this.addSystem(new HUDSystem())
    this.addSystem(new TweenSystem())
    this.addSystem(new ScaleSystem(container.dom, options.scale))
    this.addSystem(new SoundSystem())
    this.addSystem(new VisibilitySystem())
    this.enqueueSystems()

    // alias some useful objects
    this.container = container
    this.stage = this.systems.render.stage
    this.size = this.systems.render.size

    events.listen()
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
}

/**
 * The global single instance of FT.
 */
const ft = new FT()

export default ft
