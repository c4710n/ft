import { Ticker } from '@pixi/ticker'
import app from '../../app'
import System, { UPDATE_PRIORITY } from '../System'
import { Layer, PIXI } from '../../core'
import events from '../../events'

class RenderSystem extends System {
  constructor({
    type = 'auto',
    width = 750,
    height = 1500,
    transparent = true,
    antialias = false,
  } = {}) {
    super('render', UPDATE_PRIORITY.LOW)

    this.container = app.container

    this.width = width
    this.height = height
    this.size = this.getSize()
    app.size = this.size

    const options = { width, height, transparent, antialias }

    if (type === 'webgl') {
      this.renderer = new PIXI.Renderer(options)
    } else if (type === 'canvas') {
      this.renderer = new PIXI.CanvasRenderer(options)
    } else {
      this.renderer = PIXI.autoDetectRenderer(options)
    }
    app.renderer = this.renderer

    this.view = this.renderer.view
    this.view.style.zIndex = Layer.VIEW
    this.view.style.position = 'absolute'
    this.view.style.width = '100%'
    this.view.style.height = '100%'
    app.view = this.view

    this.stage = app.stage
    this.stage.added = true // in order to make patchDisplayObjectLifecycle work.

    this.container.appendChild(this.view)
    this.remapInteraction()
  }

  /**
   * Resize stage.
   *
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.width = width
    this.height = height

    this.updateSize()
    this.renderer.resize(width, height)
    events.resize.emit()
  }

  getSize() {
    const { width, height } = this

    return {
      width: width,
      height: height,
      centerX: width / 2,
      centerY: height / 2,
      center: [width / 2, height / 2],
    }
  }

  updateSize() {
    const { width, height } = this
    this.size.width = width
    this.size.height = height
    this.size.centerX = width / 2
    this.size.centerY = height / 2
    this.size.center = [width / 2, height / 2]
  }

  update() {
    const { stage, renderer } = this

    // render stage
    renderer.render(stage)
  }

  /**
   * @access private
   */
  remapInteraction() {
    const { container, renderer } = this
    const { interaction } = renderer.plugins
    const { normalizeToPointerData } = interaction

    interaction.autoPreventDefault = false
    interaction.addEvents = addEvents.bind(interaction)
    interaction.normalizeToPointerData = function(event) {
      this.interactionDOMElement = event.target
      return normalizeToPointerData.call(this, event)
    }
    interaction.mapPositionToPoint = function(point, x, y) {
      const { scale } = app.systems.scale.position
      const rotate = app.systems.scale.rotate

      // the unit of x, y is CSS pixel
      const resolutionMultiplier = 1.0 / this.resolution

      const rect = container.getBoundingClientRect()

      if (rotate) {
        point.x = ((y - rect.top) / scale) * resolutionMultiplier
        point.y =
          ((rect.width - (x - rect.left)) / scale) * resolutionMultiplier
      } else {
        point.x = ((x - rect.left) / scale) * resolutionMultiplier
        point.y = ((y - rect.top) / scale) * resolutionMultiplier
      }
    }

    // reset instance of InteractionManager
    interaction.setTargetElement(container, renderer.resolution)
  }
}

export default RenderSystem

/**
 * OVERRIDES ORIGINAL PIXI CODE
 *
 * make sure touch events and mouse events aren't binded together.
 *
 * PIXI VERSION: 5.1.1
 * + https://github.com/pixijs/pixi.js/blob/40e1e4a12518ee067c6871dcdd930602346197de/packages/interaction/src/InteractionManager.js
 */
function addEvents() {
  if (!this.interactionDOMElement) {
    return
  }
  Ticker.system.add(this.update, this, UPDATE_PRIORITY.INTERACTION)
  if (window.navigator.msPointerEnabled) {
    this.interactionDOMElement.style['-ms-content-zooming'] = 'none'
    this.interactionDOMElement.style['-ms-touch-action'] = 'none'
  } else if (this.supportsPointerEvents) {
    this.interactionDOMElement.style['touch-action'] = 'none'
  }
  /**
   * These events are added first, so that if pointer events are normalized, they are fired
   * in the same order as non-normalized events. ie. pointer event 1st, mouse / touch 2nd
   */

  if (this.supportsPointerEvents) {
    window.document.addEventListener('pointermove', this.onPointerMove, true)
    this.interactionDOMElement.addEventListener(
      'pointerdown',
      this.onPointerDown,
      true
    )
    // pointerout is fired in addition to pointerup (for touch events) and pointercancel
    // we already handle those, so for the purposes of what we do in onPointerOut, we only
    // care about the pointerleave event
    this.interactionDOMElement.addEventListener(
      'pointerleave',
      this.onPointerOut,
      true
    )
    this.interactionDOMElement.addEventListener(
      'pointerover',
      this.onPointerOver,
      true
    )
    window.addEventListener('pointercancel', this.onPointerCancel, true)
    window.addEventListener('pointerup', this.onPointerUp, true)
  }

  if (this.supportsTouchEvents) {
    // always look directly for touch events so that we can provide original data
    // In a future version we should change this to being just a fallback and rely solely on
    // PointerEvents whenever available
    this.interactionDOMElement.addEventListener(
      'touchstart',
      this.onPointerDown,
      true
    )
    this.interactionDOMElement.addEventListener(
      'touchcancel',
      this.onPointerCancel,
      true
    )
    this.interactionDOMElement.addEventListener(
      'touchend',
      this.onPointerUp,
      true
    )
    this.interactionDOMElement.addEventListener(
      'touchmove',
      this.onPointerMove,
      true
    )
  } else {
    window.document.addEventListener('mousemove', this.onPointerMove, true)
    this.interactionDOMElement.addEventListener(
      'mousedown',
      this.onPointerDown,
      true
    )
    this.interactionDOMElement.addEventListener(
      'mouseout',
      this.onPointerOut,
      true
    )
    this.interactionDOMElement.addEventListener(
      'mouseover',
      this.onPointerOver,
      true
    )
    window.addEventListener('mouseup', this.onPointerUp, true)
  }

  this.eventsAdded = true
}
