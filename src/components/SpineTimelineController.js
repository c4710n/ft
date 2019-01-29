import { Tween, Easing } from '#/animation'
import Component from './Component'

/**
 * A controllor for controlling the trackTime of Spine tracks.
 */

class SpineTrackController extends Component {
  constructor(track, { enableControl = true } = {}) {
    super()

    this.$track = track
    this.$enableControl = enableControl
    this.$currentTrackTime = 0
    this.$minTrackTime = this.$currentTrackTime
    this.$maxTrackTime = track.animationEnd - track.animationStart
    this.$isPlaying = false
    this.$playingSpeed = 0

    this.resetMomentumVelocity()
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)

    displayObject.spineTrackController = this

    if (this.$enableControl) {
      displayObject.interactive = true
    }
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

  onUpdate() {
    if (this.$isPlaying) {
      this.$currentTrackTime += this.$playingSpeed
    }

    this.$track.trackTime = this.$currentTrackTime
  }

  enableControl() {
    this.displayObject.interactive = true
  }

  disableControl() {
    this.displayObject.interactive = false
  }

  get currentTrackTime() {
    return this.$currentTrackTime
  }

  set currentTrackTime(time) {
    this.$currentTrackTime = time
  }

  get minTrackTime() {
    return this.$minTrackTime
  }

  set minTrackTime(time) {
    this.$minTrackTime = time
  }

  get maxTrackTime() {
    return this.$maxTrackTime
  }

  set maxTrackTime(time) {
    this.$maxTrackTime = time
  }

  play(speed = 0.025) {
    this.$playingSpeed = speed
    this.$isPlaying = true
  }

  pause() {
    this.$playingSpeed = 0
    this.$isPlaying = false
  }

  mapShiftToTime(shift) {
    // shift x is too big, scale it with an factor
    const factor = 0.007
    // convert a shift into a time
    const time = shift * factor * -1
    return time
  }

  onPointerDown(event) {
    const controller = this.spineTrackController

    if (controller.isScrolling) return
    controller.isScrolling = true

    controller.stopMomentum()
    controller.previousTimestamp = event.data.originalEvent.timeStamp
    controller.previousPosition = event.data.getLocalPosition(this)
    controller.data = event.data
  }

  onPointerMove(event) {
    const controller = this.spineTrackController

    if (!controller.isScrolling) return

    const currentTimestamp = event.data.originalEvent.timeStamp
    const currentPosition = controller.data.getLocalPosition(this)

    const scrollTime = currentTimestamp - controller.previousTimestamp
    const shiftX = currentPosition.x - controller.previousPosition.x
    const changedTime = controller.mapShiftToTime(shiftX)

    controller.momentumVelocity =
      scrollTime === 0 ? 0 : changedTime / scrollTime

    const trackTime = controller.$currentTrackTime + changedTime
    if (trackTime < controller.$minTrackTime) {
      controller.$currentTrackTime = controller.$minTrackTime
    } else if (trackTime > controller.$maxTrackTime) {
      controller.$currentTrackTime = controller.$maxTrackTime
    } else {
      controller.$currentTrackTime = trackTime
    }

    controller.previousTimestamp = currentTimestamp
    controller.previousPosition = currentPosition
  }

  onPointerUp() {
    const controller = this.spineTrackController

    if (!controller.isScrolling) return
    controller.isScrolling = false

    controller.data = null
    controller.handleMomentum()
  }

  handleMomentum = () => {
    const minVelocity = 0.01
    const maxVelocity = 0.02

    let { momentumVelocity } = this
    const absMomentumVelocity = Math.abs(momentumVelocity)

    if (absMomentumVelocity > maxVelocity) {
      momentumVelocity = maxVelocity * Math.sign(momentumVelocity)
    }

    if (absMomentumVelocity >= minVelocity) {
      const from = { velocity: momentumVelocity * 10 }
      const to = { velocity: 0 }
      const duration = absMomentumVelocity * 90000 // magic number ;)

      const momentum = new Tween(from)
        .to(to)
        .duration(duration)
        .easing(Easing.Quintic.Out)

      let cacheTrackTime = this.currentTrackTime
      momentum.on('update', ({ velocity }) => {
        cacheTrackTime += velocity

        if (
          cacheTrackTime <= this.$maxTrackTime &&
          cacheTrackTime >= this.$minTrackTime
        ) {
          this.$currentTrackTime = cacheTrackTime
        } else {
          momentum.halt()
        }
      })

      momentum.start()
      this.momentum = momentum
    }

    this.resetMomentumVelocity()
  }

  resetMomentumVelocity = () => {
    this.previousTimestamp = 0
    this.previousPosition = null
    this.momentumVelocity = 0
  }

  stopMomentum = () => {
    if (this.momentum) this.momentum.halt()
  }
}

export default SpineTrackController
