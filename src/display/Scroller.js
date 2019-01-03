import { Tween, Easing } from '#/animation'
import TWEEN from '#/animation/TWEEN'
import PIXI from '#/pixi'

class Scroller extends PIXI.Container {
  constructor({ width = 1500, height = 750, content, resistance = 20 } = {}) {
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

    this.maxX = 0
    this.minX = width - content.width
    this.maxY = 0
    this.minY = height - content.height

    this.tween = null
    this.resistance = resistance

    // bounce related
    const overflow = 100
    this.maxOverflowX = overflow
    this.minOverflowX = this.minX - overflow
    this.maxOverflowY = overflow
    this.minOverflowY = this.minY - overflow

    // momentum related
    this.previousPosition = null
    this.previousTimestamp = 0
    this.scrollVelocityX = 0
    this.scrollVelocityY = 0
  }

  onPointerDown = event => {
    this.isScrolling = true
    if (this.tween) this.tween.stop()

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this.content)
    this.previousPosition = this.pointerDownPosition
    this.previousTimestamp = event.data.originalEvent.timeStamp
  }

  onPointerMove = event => {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
    const currentTimestamp = event.data.originalEvent.timeStamp

    const shiftX = currentPosition.x - this.previousPosition.x
    const shiftY = currentPosition.y - this.previousPosition.y
    const time = currentTimestamp - this.previousTimestamp
    const factor = 10
    this.scrollVelocityX = (shiftX / time) * factor
    this.scrollVelocityY = (shiftY / time) * factor

    this.previousPosition = currentPosition
    this.previousTimestamp = currentTimestamp

    let x = currentPosition.x - this.pointerDownPosition.x
    let y = currentPosition.y - this.pointerDownPosition.y
    if (x > this.maxOverflowX) {
      x = this.maxOverflowX
    } else if (x < this.minOverflowX) {
      x = this.minOverflowX
    }
    if (y > this.maxOverflowY) {
      y = this.maxOverflowY
    } else if (y < this.minOverflowY) {
      y = this.minOverflowY
    }

    this.content.position.set(x, y)
  }

  onPointerUp = () => {
    this.isScrolling = false

    this.handleBounce()
    this.handleMomentum()
  }

  handleBounce = () => {
    const { content } = this
    const { x, y } = content

    const to = {}

    if (x > this.maxX) {
      to.x = this.maxX
    } else if (x < this.minX) {
      to.x = this.minX
    }

    if (y > this.maxY) {
      to.y = this.maxY
    } else if (y < this.minY) {
      to.y = this.minY
    }

    this.tween = new Tween(content)
      .to(to, 500)
      .easing(Easing.Quartic.Out) // this easing is awesome for bounce
      .start()
  }

  resetScrollVelocity() {
    this.previousPosition = null
    this.previousTimestamp = 0
    this.scrollVelocityX = 0
    this.scrollVelocityY = 0
  }

  handleMomentum = () => {
    if (Math.abs(this.scrollVelocityX) < 3) return

    let { x: cacheX } = this.content
    const velocityX = this.scrollVelocityX
    this.resetScrollVelocity()

    const duration = (100 - this.resistance) * Math.abs(velocityX)

    const tween = new Tween({
      velocityX,
    })
      .to({ velocityX: 0 }, duration)
      .easing(Easing.Quintic.Out)
      .start()
    tween.on('update', ({ velocityX }) => {
      cacheX += velocityX

      if (cacheX <= this.maxOverflowX && cacheX >= this.minOverflowX) {
        this.content.x = cacheX
      } else {
        /**
         * This is a workaround for stop tween.
         * When calling tween.stop(), it will trigger an error.
         */
        tween.pause()
        TWEEN.remove(tween)
        this.handleBounce()
      }
    })
    tween.on('complete', () => {
      this.handleBounce()
    })

    this.tween = tween
  }
}

export default Scroller
