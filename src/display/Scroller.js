import { Tween, Easing } from '#/animation'
import TWEEN from '#/animation/TWEEN'
import PIXI from '#/pixi'

class Scroller extends PIXI.Container {
  constructor({
    width = 1500,
    height = 750,
    enableX = true,
    enableY = false,
    content,
    resistance = 20,
    overflow = 100,
  } = {}) {
    super()

    const { WHITE } = PIXI.Texture
    const mask = new PIXI.Sprite(WHITE)
    mask.width = width
    mask.height = height
    this.addChild(mask)

    const window = new PIXI.Container()
    window.mask = mask
    this.addChild(window)

    window.addChild(content)
    this.content = content

    window.interactive = true
    window.on('pointerdown', this.onPointerDown)
    window.on('pointermove', this.onPointerMove)
    window.on('pointerup', this.onPointerUp)
    window.on('pointerupoutside', this.onPointerUp)

    // scroll
    this.enableX = enableX
    this.enableY = enableY
    this.resistance = resistance

    // position
    this.maxX = 0
    this.minX = width - content.width
    this.maxY = 0
    this.minY = height - content.height

    // bounce related
    this.bounceX = null
    this.bounceY = null
    this.maxOverflowX = overflow
    this.minOverflowX = this.minX - overflow
    this.maxOverflowY = overflow
    this.minOverflowY = this.minY - overflow

    // momentum related
    this.momentumX = null
    this.momentumY = null
    this.resetScrollVelocity()
  }

  onPointerDown = event => {
    this.isScrolling = true
    this.stopTween()

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this.content)
    this.previousPosition = this.pointerDownPosition
    this.previousTimestamp = event.data.originalEvent.timeStamp
  }

  onPointerMove = event => {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
    const currentTimestamp = event.data.originalEvent.timeStamp
    const time = currentTimestamp - this.previousTimestamp
    const factor = 10

    if (this.enableX) {
      const shiftX = currentPosition.x - this.previousPosition.x
      this.scrollVelocityX = (shiftX / time) * factor

      let x = currentPosition.x - this.pointerDownPosition.x
      if (x > this.maxOverflowX) {
        x = this.maxOverflowX
      } else if (x < this.minOverflowX) {
        x = this.minOverflowX
      }

      this.content.x = x
    }

    if (this.enableY) {
      const shiftY = currentPosition.y - this.previousPosition.y
      this.scrollVelocityY = (shiftY / time) * factor

      let y = currentPosition.y - this.pointerDownPosition.y
      if (y > this.maxOverflowY) {
        y = this.maxOverflowY
      } else if (y < this.minOverflowY) {
        y = this.minOverflowY
      }

      this.content.y = y
    }

    this.previousPosition = currentPosition
    this.previousTimestamp = currentTimestamp
  }

  onPointerUp = () => {
    this.isScrolling = false
    this.data = null

    this.handleBounce()
    this.handleMomentum()
  }

  handleBounce = () => {
    const { x, y } = this.content

    if (this.enableX && (x > this.maxX || x < this.minX)) {
      const from = { x }
      const to = {}

      if (x > this.maxX) {
        to.x = this.maxX
      } else if (x < this.minX) {
        to.x = this.minX
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(500)
        .easing(Easing.Quartic.Out)
        .start()
      bounce.on('update', ({ x }) => {
        this.content.x = x
      })

      this.bounceX = bounce
    }

    if (this.enableY && (y > this.maxY || y < this.minY)) {
      const from = { y }
      const to = {}

      if (y > this.maxY) {
        to.y = this.maxY
      } else if (y < this.minY) {
        to.y = this.minY
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(500)
        .easing(Easing.Quartic.Out)
        .start()
      bounce.on('update', ({ y }) => {
        this.content.y = y
      })

      this.bounceY = bounce
    }
  }

  stopTween = () => {
    if (this.bounceX) this.bounceX.stop()
    if (this.bounceY) this.bounceY.stop()
    if (this.momentumX) this.momentumX.stop()
    if (this.momentumY) this.momentumY.stop()
  }

  resetScrollVelocity() {
    this.previousPosition = null
    this.previousTimestamp = 0
    this.scrollVelocityX = 0
    this.scrollVelocityY = 0
  }

  handleMomentum = () => {
    const absScrollVelocityX = Math.abs(this.scrollVelocityX)
    const absScrollVelocityY = Math.abs(this.scrollVelocityY)

    if (this.enableX && absScrollVelocityX >= 3) {
      const from = {}
      const to = {}

      from.velocity = this.scrollVelocityX
      to.velocity = 0

      let { x: cacheX } = this.content
      const duration = (100 - this.resistance) * absScrollVelocityX

      const momentum = new Tween(from)
        .to(to)
        .duration(duration)
        .easing(Easing.Quintic.Out)
        .start()

      momentum.on('update', ({ velocity }) => {
        cacheX += velocity

        if (cacheX <= this.maxOverflowX && cacheX >= this.minOverflowX) {
          this.content.x = cacheX
        } else {
          /**
           * This is a workaround for stop tween.
           * When calling tween.stop(), it will trigger an error.
           */
          momentum.pause()
          TWEEN.remove(momentum)
          this.handleBounce()
        }
      })

      momentum.on('complete', this.handleBounce)
      this.momentumX = momentum
    }

    if (this.enableY && absScrollVelocityY >= 3) {
      const from = {}
      const to = {}

      from.velocity = this.scrollVelocityY
      to.velocity = 0

      let { y: cacheY } = this.content
      const duration = (100 - this.resistance) * absScrollVelocityY
      this.resetScrollVelocity()

      const momentum = new Tween(from)
        .to(to)
        .duration(duration)
        .easing(Easing.Quintic.Out)
        .start()

      momentum.on('update', ({ velocity }) => {
        cacheY += velocity

        if (cacheY <= this.maxOverflowY && cacheY >= this.minOverflowY) {
          this.content.y = cacheY
        } else {
          /**
           * This is a workaround for stop tween.
           * When calling tween.stop(), it will trigger an error.
           */
          momentum.pause()
          TWEEN.remove(momentum)
          this.handleBounce()
        }
      })

      momentum.on('complete', this.handleBounce)
      this.momentumY = momentum
    }

    this.resetScrollVelocity()
  }
}

export default Scroller
