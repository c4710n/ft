import PIXI from '#/pixi'
import { FT, Device, Layer } from '#/core'
import { classname } from '#/utils'
import System from '../System'
import ScaleMode from './ScaleMode'

const { autoDetectRenderer, utils } = PIXI

// keep quiet!
utils.skipHello()

/**
 * System for render.
 */
class RenderSystem extends System {
  #view
  #renderer
  #stage
  #designWidth
  #designHeight
  #scaleMode

  constructor(
    container,
    stage,
    { width, height, scaleMode, eventMode = 'canvas' } = {}
  ) {
    super()

    const renderer = autoDetectRenderer({
      transparent: true,
      antialias: true,
    })
    container.appendChild(renderer.view)

    this.#renderer = renderer
    this.#view = renderer.view
    this.#stage = stage
    this.#designWidth = width
    this.#designHeight = height
    this.#scaleMode = scaleMode

    if (eventMode === 'dom') {
      this.enableDomEventMode()
    }

    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  onResize = () => {
    const { width: deviceWidth, height: deviceHeight } = Device.size.clone()

    const mode = this.#scaleMode
    const scale = ScaleMode[mode]
    if (!scale) {
      throw new Error(`[${classname(this)}] unsupported scale mode - ${mode}`)
    }

    const { stage, viewport, shouldRotate } = scale(
      this.#designWidth,
      this.#designHeight,
      deviceWidth,
      deviceHeight
    )

    this.#view.style.zIndex = Layer.VIEW
    this.#view.style.position = 'absolute'

    const viewportWidth = Math.round(Device.size.width)
    const viewportHeight = Math.round(Device.size.height)
    const viewportCSSWidth = Math.round(Device.cssSize.width)
    const viewportCSSHeight = Math.round(Device.cssSize.height)
    this.#view.style.width = `${viewportCSSWidth}px`
    this.#view.style.height = `${viewportCSSHeight}px`
    this.#renderer.resize(viewportWidth, viewportHeight)

    this.#stage.scale.set(stage.scale)
    const x = stage.x * stage.scale
    const y = stage.y * stage.scale

    if (shouldRotate) {
      this.#stage.rotation = 0.5 * Math.PI
      this.#stage.x = viewportWidth - y
      this.#stage.y = x
    } else {
      this.#stage.rotation = 0
      this.#stage.x = x
      this.#stage.y = y
    }

    FT.stage = stage
    FT.viewport = viewport
  }

  enableDomEventMode() {
    /**
     * Visit following link for more details.
     * @see https://github.com/pixijs/pixi.js/blob/v4.x/src/interaction/InteractionManager.js
     */
    const renderer = this.#renderer
    const interaction = renderer.plugins.interaction
    const target = document.body
    interaction.setTargetElement(target, renderer.resolution)

    interaction.autoPreventDefault = false

    const { normalizeToPointerData } = interaction
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }

    interaction.mapPositionToPoint = function(point, x, y) {
      point.x = x * Device.DPR
      point.y = y * Device.DPR
    }
  }

  update() {
    this.#renderer.render(this.#stage)
  }
}

export default RenderSystem
