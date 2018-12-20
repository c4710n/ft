import { Application, utils } from 'pixi.js'
import { TWEEN } from '../animation'
import { ECS } from '../ecs'
import { ScaleSystem, VisibleSystem, PositionSystem } from '../systems'
import ResManager from '../res/ResManager'
import SceneManager from '../scene/SceneManager'
import { classname } from '../utils'

// keep quiet!
utils.skipHello()

const defaultOptions = {
  width: 750,
  height: 1500,
  transparent: true,
  sharedTicker: false,
  antialias: true,
  autoStart: false,
  scaleMode: 'COVER',
  backgroundColor: '#ffffff',
}

class FT {
  #container
  #options
  #engine
  #view
  #renderer
  #stage

  constructor() {
    this.rm = ResManager.default
    this.sm = SceneManager.default
  }

  init(selector, options) {
    this.#options = Object.assign(defaultOptions, options)

    const engine = new Application(this.#options)
    this.#engine = engine
    this.#view = engine.view
    this.#renderer = engine.renderer
    this.#stage = engine.stage

    this._bindProperties(engine)

    // ECS subsystem
    const ecs = new ECS()
    this.ecs = ecs

    const { view, renderer, stage } = engine
    const designWidth = this.#options.width
    const designHeight = this.#options.height
    const mode = this.#options.scaleMode
    ecs.addSystem(
      new ScaleSystem(view, renderer, stage, {
        designWidth,
        designHeight,
        mode,
      })
    )
    ecs.addSystem(new VisibleSystem())
    ecs.addSystem(new PositionSystem())

    const container = document.querySelector(selector)
    this.#container = container
    this._checkContainer(container)
    this._styleContainer(container)
    container.appendChild(this.#view)

    engine.ticker.add(dt => {
      TWEEN.update(performance.now())
      this.ecs.update(dt)
    })
  }

  start() {
    this.#engine.start()
  }

  stop() {
    this.#engine.stop()
  }

  get backgroundColor() {
    return this.#container.style.backgroundColor
  }

  set backgroundColor(color) {
    this.#container.style.backgroundColor = color
  }

  /**
   * Bind instance's properties on FT. It helps me to write less code.
   */
  _bindProperties(app) {
    window.FT = this
    this.instance = this
    this.internal = {}
    this.engine = app
    this.view = app.view
    this.renderer = app.renderer
    this.internal.stage = app.stage
    this.screen = app.screen
    this.ticker = app.ticker
  }

  _checkContainer(container) {
    if (!container) {
      throw new Error(`[${classname(this)}] invalid selector of container`)
    }
  }

  _styleContainer(container) {
    const { backgroundColor } = this.#options
    container.style.backgroundColor = backgroundColor
    container.style.userSelect = 'none'
    container.style.touchAction = 'none'
    container.style.cursor = 'auto'
    container.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)'
  }
}

export default new FT()
