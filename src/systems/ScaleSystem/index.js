import { FT, Device, Layer } from '../../core'
import ScaleMode from './ScaleMode'
import { System } from '../../ecs'
import { classname } from '../../utils'

class ScaleSystem extends System {
  #view
  #renderer
  #stage
  #designWidth
  #designHeight
  #mode

  constructor(view, renderer, stage, { designWidth, designHeight, mode }) {
    super()

    this.#view = view
    this.#renderer = renderer
    this.#stage = stage
    this.#designWidth = designWidth
    this.#designHeight = designHeight
    this.#mode = mode

    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  onResize = () => {
    const { width: deviceWidth, height: deviceHeight } = Device.size.clone()

    const mode = this.#mode
    const scale = ScaleMode[mode]
    if (!scale) {
      throw new Error(`[${classname(this)}] unsupported scale mode - ${mode}`)
    }

    const {
      stage,
      viewportWidth,
      viewportHeight,
      viewportCSSWidth,
      viewportCSSHeight,
      shouldRotate,
    } = scale(this.#designWidth, this.#designHeight, deviceWidth, deviceHeight)

    this.#view.style.zIndex = Layer.VIEW
    this.#view.style.position = 'absolute'
    this.#view.style.width = `${viewportCSSWidth}px`
    this.#view.style.height = `${viewportCSSHeight}px`
    this.#renderer.resize(viewportWidth, viewportHeight)

    this.#stage.scale.set(stage.scale)
    if (shouldRotate) {
      this.#stage.rotation = 0.5 * Math.PI
      this.#stage.x = viewportWidth - stage.y
      this.#stage.y = stage.x
    } else {
      this.#stage.rotation = 0
      this.#stage.x = stage.x
      this.#stage.y = stage.y
    }

    FT.stage = stage
  }
}

export default ScaleSystem
