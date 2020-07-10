import Component from './Component'
import { clamp } from '../math'

class Slidable extends Component {
  constructor(direction, { min = -400, max = 0, onCompleted, onFailed } = {}) {
    super()

    this.name = 'slidable'

    this.$dragging = false
    this.$eventData = null
    this.$pointerdownLocalY = 0
    this.$previousTimestamp = 0

    this.reset(direction, { min, max, onCompleted, onFailed })
  }

  reset(direction, { min, max, onCompleted, onFailed }) {
    this.direction = direction
    this.min = min
    this.max = max
    this.completed = false
    this.onCompleted = onCompleted
    this.onFailed = onFailed
  }

  onAdded(displayObject) {
    displayObject.on('pointerdown', this.onPointerDown, this)
    displayObject.on('pointerup', this.onPointerUp, this)
    displayObject.on('pointerupoutside', this.onPointerUp, this)
    displayObject.on('pointermove', this.onPointerMove, this)
  }

  onRemoved(displayObject) {
    displayObject.off('pointerdown', this.onPointerDown, this)
    displayObject.off('pointerup', this.onPointerUp, this)
    displayObject.off('pointerupoutside', this.onPointerUp, this)
    displayObject.off('pointermove', this.onPointerMove, this)
  }

  onPointerDown(event) {
    if (this.completed) return

    const { displayObject } = this

    this.$dragging = true
    this.$eventData = event.data

    // click position relative to current displayObject
    this.$pointerdownLocalY = this.$eventData.getLocalPosition(displayObject).y

    // displayObject's position relative to its parent
    const currentY = this.$eventData.getLocalPosition(displayObject.parent).y
    this.$previousY = currentY - this.$pointerdownLocalY

    this.$previousTimestamp = this.$eventData.originalEvent.timeStamp
  }

  onPointerMove(event) {
    if (this.completed) return
    if (!this.$dragging) return

    const {
      displayObject,
      $previousY,
      $previousTimestamp,
      direction,
      min,
      max,
      onCompleted,
    } = this

    const currentY = this.$eventData.getLocalPosition(displayObject.parent).y
    const currentTimestamp = event.data.originalEvent.timeStamp
    const $currentY = currentY - this.$pointerdownLocalY

    const deltaY = $currentY - $previousY
    const deltaTime = currentTimestamp - $previousTimestamp
    const speed = Math.abs(deltaY / deltaTime)

    const y = clamp($currentY, min, max)
    displayObject.position.y = y

    if (
      speed > 1 ||
      (direction === 'up' && y === min) ||
      (direction === 'down' && y === max)
    ) {
      this.completed = true
      onCompleted?.({ direction, min, max })
    }
  }

  onPointerUp() {
    this.$dragging = false
    this.$eventData = null

    const { completed, direction, min, max, onFailed, displayObject } = this

    if (!completed) {
      if (direction === 'up') {
        onFailed?.({ direction, min, max })
        displayObject.position.y = max
      }

      if (direction === 'down') {
        onFailed?.({ direction, min, max })
      }
    }
  }
}

export default Slidable
