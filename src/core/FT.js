import patch from '#/patch'
import PIXI from '#/pixi'
import ResManager from '#/res/ResManager'
import SceneManager from '#/scene/SceneManager'
import { TweenSystem, WidgetSystem, BasicRenderSystem } from '#/systems'

const { Container, ticker } = PIXI
const { Ticker } = ticker

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

class FT {
  #systems
  #updates

  constructor() {
    window.FT = this
    this.internal = {}

    this.systems = []
    this.#updates = 0
    this.rm = ResManager.default
    this.sm = SceneManager.default

    const ticker = new Ticker()
    this.ticker = ticker

    this.create = patch.createDisplayObject
  }

  init(selector, options) {
    const { width, height, scaleMode, backgroundColor } = Object.assign(
      defaultOptions,
      options
    )

    const container = createContainer(selector)
    this.container = container
    this.backgroundColor = backgroundColor

    const stage = new Container()
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

  addSystem(system) {
    this.systems.push(system)
  }

  update(dt) {
    for (const system of this.systems) {
      if (this.#updates % system.frequency > 0) {
        break
      }

      system.update(dt)
    }

    this.#updates += 1
  }

  start() {
    this.ticker.start()
  }

  stop() {
    this.ticker.stop()
  }

  get backgroundColor() {
    return this.container.style.backgroundColor
  }

  set backgroundColor(color) {
    this.container.style.backgroundColor = color
  }
}

export default new FT()
