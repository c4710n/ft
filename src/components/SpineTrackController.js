import Component from './Component'

class SpineTrackController extends Component {
  constructor(track) {
    super()

    this.trackDuration = track.animationEnd - track.animationStart
    this.currentTrackTime = 0
    this.cacheTrackTime = this.currentTrackTime
  }

  get currentTime() {
    return this.currentTrackTime
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)

    displayObject.spineTrackController = this

    displayObject.interactive = true
    displayObject.on('pointerdown', this.onPointerDown)
    displayObject.on('pointermove', this.onPointerMove)
    displayObject.on('pointerup', this.onPointerUp)
    displayObject.on('pointerupoutside', this.onPointerUp)
  }

  onRemoved(displayObject) {
    displayObject.interactive = false
    displayObject.off('pointerdown', this.onPointerDown)
    displayObject.off('pointermove', this.onPointerMove)
    displayObject.off('pointerup', this.onPointerUp)
    displayObject.off('pointerupoutside', this.onPointerUp)

    super.onRemoved(displayObject)
  }

  onPointerDown(event) {
    this.isScrolling = true

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this)
  }

  onPointerMove() {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
    const x = currentPosition.x - this.pointerDownPosition.x

    const factor = 0.005
    const time = x * factor * -1

    const controller = this.spineTrackController

    const trackTime = controller.cacheTrackTime + time

    if (trackTime < 0) {
      // exceed the start point
      controller.currentTrackTime = 0
    } else if (trackTime > controller.trackDuration) {
      // exceed the end point
      controller.currentTrackTime = controller.trackDuration
    } else {
      // between start point and end point
      controller.currentTrackTime = trackTime
    }
  }

  onPointerUp() {
    this.isScrolling = false

    const controller = this.spineTrackController

    controller.cacheTrackTime = controller.currentTrackTime

    this.data = null
  }
}

export default SpineTrackController
