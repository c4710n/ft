import app from '../../app'
import System from '../System'
import modes from './Modes'
import events from '../../events'
import { classname } from '../../utils'

class ScaleSystem extends System {
  constructor({ mode = 'COVER' } = {}) {
    super('scale')

    this.container = app.container
    this.mode = mode

    events.resize.on(({ width, height }) => {
      this.scale(width, height)
    }, this)
  }

  /**
   * @access private
   */
  scale(viewportCSSWidth, viewportCSSHeight) {
    const { width, height } = app.systems.render

    const { mode } = this
    const scaleMode = modes[mode]

    if (!scaleMode) {
      throw new Error(`[${classname(this)}] unsupported scale mode - ${mode}`)
    }
    const { shouldRotate, position, bounds, viewport } = scaleMode(
      width,
      height,
      viewportCSSWidth,
      viewportCSSHeight
    )

    this.rotate = shouldRotate
    this.position = position
    this.bounds = bounds
    this.viewport = viewport

    let { scale, offsetCSSX, offsetCSSY } = position
    let rotation = 0

    if (shouldRotate) {
      rotation = 90
      const baseOffsetCSSX = 0
      const baseOffsetCSSY = viewport.cssHeight

      offsetCSSX = baseOffsetCSSX + offsetCSSX
      offsetCSSY = baseOffsetCSSY - offsetCSSY
      ;[offsetCSSX, offsetCSSY] = [offsetCSSY, offsetCSSX]
    }

    this.container.style.position = 'absolute'
    this.container.style.width = `${width}px`
    this.container.style.height = `${height}px`
    this.container.style.transformOrigin = '0 0'
    this.container.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${offsetCSSX}, ${offsetCSSY}) rotate(${rotation}deg)`
  }
}

export default ScaleSystem
