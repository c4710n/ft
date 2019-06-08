import patch from './patch'
import { PIXI, styleDOM } from './core'
import {
  RenderSystem,
  HUDSystem,
  TweenSystem,
  ScaleSystem,
  SoundSystem,
  VisibilitySystem,
} from './systems'
import { Factory as DisplayFactory } from './display'
import ResManager from './res/ResManager'
import SceneManager from './scene/SceneManager'
import events from './events'

patch()

/**
 * Commander for framework.
 */
class App {
  constructor() {
    this.container = null
    this.ticker = new PIXI.Ticker()
    this.stage = new PIXI.Container()
    this.systems = {}
    this.rm = ResManager.default
    this.sm = SceneManager.default
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
  init(dom, options) {
    this.container = new styleDOM(dom, options.container)

    this.addSystem(new RenderSystem(options.render))
    this.addSystem(new HUDSystem())
    this.addSystem(new TweenSystem())
    this.addSystem(new ScaleSystem(options.scale))
    this.addSystem(new SoundSystem())
    this.addSystem(new VisibilitySystem())
    this.enqueueSystems()

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

const app = new App()

export default app
