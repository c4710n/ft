import { Tween, Easing } from '#/animation'
import PIXI from '#/pixi'

class Scroller extends PIXI.Container {
  constructor({ width = 1500, height = 750, content } = {}) {
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

    this.bounce = null

    this.maxX = 0
    this.minX = width - content.width
    this.maxY = 0
    this.minY = height - content.height

    const overflow = 100
    this.maxOverflowX = overflow
    this.minOverflowX = this.minX - overflow
    this.maxOverflowY = overflow
    this.minOverflowY = this.minY - overflow
  }

  onPointerDown = event => {
    this.isScrolling = true
    if (this.bounce) this.bounce.stop()

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this.content)
  }

  onPointerMove = () => {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
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
    this.data = null

    this.handleBounce()
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

    this.bounce = new Tween(content)
      .to(to, 500)
      .easing(Easing.Quartic.Out) // this easing is awesome for bounce
      .start()
  }
}

export default Scroller
