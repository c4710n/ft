import Component from './Component'

class Draggable extends Component {
  onAdded(displayObject) {
    super.onAdded(displayObject)
    displayObject.interactive = true

    displayObject.on('pointerdown', this.onDragStart)
    displayObject.on('pointerup', this.onDragEnd)
    displayObject.on('pointerupoutside', this.onDragEnd)
    displayObject.on('pointermove', this.onDragMove)
  }

  onRemoved(displayObject) {
    displayObject.interactive = false
    displayObject.off('pointerdown', this.onDragStart)
    displayObject.off('pointerup', this.onDragEnd)
    displayObject.off('pointerupoutside', this.onDragEnd)
    displayObject.off('pointermove', this.onDragMove)

    super.onRemoved(displayObject)
  }

  onDragStart(event) {
    this.dragging = true
    this.data = event.data

    // click position relative to current displayObject
    this.pointerDownPosition = this.data.getLocalPosition(this)
  }

  onDragEnd() {
    this.dragging = false
    this.data = null
  }

  onDragMove() {
    if (!this.dragging) return

    // click position relative to the parent of current displayObject
    const currentPosition = this.data.getLocalPosition(this.parent)
    const x = currentPosition.x - this.pointerDownPosition.x
    const y = currentPosition.y - this.pointerDownPosition.y
    this.position.set(x, y)
  }
}

export default Draggable
