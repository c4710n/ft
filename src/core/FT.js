import { Container, ticker } from 'pixi.js'
import { TWEEN } from '#/animation'
import { ECS } from '#/ecs'
import {
  DisplaySystem,
  VisibleSystem,
  WidgetSystem,
  BasicRenderSystem,
} from '#/systems'
import ResManager from '#/res/ResManager'
import SceneManager from '#/scene/SceneManager'

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
  constructor() {
    window.FT = this
    this.internal = {}

    this.rm = ResManager.default
    this.sm = SceneManager.default
  }

  init(selector, options) {
    const { width, height, scaleMode, backgroundColor } = Object.assign(
      defaultOptions,
      options
    )

    const container = createContainer(selector)
    this.container = container
    this.backgroundColor = backgroundColor

    const ecs = new ECS()
    this.ecs = ecs

    const stage = new Container()
    this.internal.stage = stage

    const ticker = new Ticker()
    this.ticker = ticker

    ecs.addSystem(new VisibleSystem())
    ecs.addSystem(new DisplaySystem())
    ecs.addSystem(new WidgetSystem())

    const scaleOptions = {
      width,
      height,
      mode: scaleMode,
    }
    ecs.addSystem(new BasicRenderSystem(container, stage, scaleOptions))

    ticker.add(dt => {
      TWEEN.update(performance.now())
      this.ecs.update(dt)
    })
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
