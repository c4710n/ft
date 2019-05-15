import Component from './Component'

/**
 * Make a display object draggable.
 *
 * @example
 * const displayObject = FT.create(Text, 'Hello World')
 * const draggable = new Draggable()
 * displayObject.addComponent(draggable)
 */
class Draggable extends Component {
  constructor({ startCallback, moveCallback, endCallback } = {}) {
    super()

    /**
     * @access private
     */
    this.$dragging = false

    /**
     * @access private
     */
    this.$eventData = null

    /**
     * @access private
     */
    this.$pointerdownPosition = null

    this.startCallback = startCallback
    this.moveCallback = moveCallback
    this.endCallback = endCallback
  }

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

  /**
   * @access private
   */
  onDragStart(event) {
    this.$dragging = true
    this.$eventData = event.data

    // click position relative to current displayObject
    this.$pointerdownPosition = this.$eventData.getLocalPosition(this)

    const component = this.components.find(c => c instanceof Draggable)
    component.startCallback && component.startCallback(this)
  }

  /**
   * @access private
   */
  onDragEnd() {
    this.$dragging = false
    this.$eventData = null

    const component = this.components.find(c => c instanceof Draggable)
    component.endCallback && component.endCallback(this)
  }

  /**
   * @access private
   */
  onDragMove() {
    if (!this.$dragging) return

    // click position relative to the parent of current displayObject
    const currentPosition = this.$eventData.getLocalPosition(this.parent)
    const x = currentPosition.x - this.$pointerdownPosition.x
    const y = currentPosition.y - this.$pointerdownPosition.y
    this.position.set(x, y)

    const component = this.components.find(c => c instanceof Draggable)
    component.moveCallback && component.moveCallback(this)
  }
}

export default Draggable
