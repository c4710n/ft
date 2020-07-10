import Component from './Component'

class BaseGesture extends Component {
  constructor({ onStart, onMove, onEnd } = {}) {
    super()

    this.name = 'base-gesture'
    this.dragging = false
    this.eventData = null
    this.pointerdownPosition = null

    this.onStart = onStart
    this.onMove = onMove
    this.onEnd = onEnd
    this.moveDone = false
  }

  onAdded(displayObject) {
    displayObject.interactive = true
    displayObject.on('pointerdown', this.onPointerDown, this)
    displayObject.on('pointerup', this.onPointerUp, this)
    displayObject.on('pointerupoutside', this.onPointerUp, this)
    displayObject.on('pointermove', this.onPointerMove, this)
  }

  onRemoved(displayObject) {
    displayObject.interactive = false
    displayObject.off('pointerdown', this.onPointerDown, this)
    displayObject.off('pointerup', this.onPointerUp, this)
    displayObject.off('pointerupoutside', this.onPointerUp, this)
    displayObject.off('pointermove', this.onPointerMove, this)
  }

  onPointerDown(event) {
    const component = this
    const { displayObject } = this

    this.dragging = true
    this.moveDone = false
    this.eventData = event.data

    // click position relative to current displayObject
    this.pointerdownPosition = this.eventData.getLocalPosition(displayObject)

    component.onStart?.(displayObject)
  }

  onPointerUp() {
    const component = this
    const { displayObject } = this

    this.dragging = false
    this.eventData = null

    component.onEnd?.(displayObject)
  }

  onPointerMove() {
    if (!this.dragging || this.moveDone) return
    const component = this
    const { displayObject, pointerdownPosition } = this

    // click position relative to current displayObject
    const currentPosition = this.eventData.getLocalPosition(displayObject)

    const result = component.onMove(
      displayObject,
      pointerdownPosition,
      currentPosition
    )
    if (result === true) {
      this.moveDone = true
    }
  }
}

export default BaseGesture
