import { PIXI } from '../core'

const { Sprite, Graphics } = PIXI

class CircleSprite extends Sprite {
  constructor(texture) {
    super(texture)

    const { width, height } = this
    const radius = Math.min(width, height) / 2

    const offsetX = width / 2 - radius
    const offsetY = height / 2 - radius

    const x = offsetX + radius
    const y = offsetY + radius

    const circle = new Graphics()
    circle.beginFill(0x000000, 1)
    circle.drawCircle(x, y, radius)
    circle.endFill()

    this.mask = circle
    this.addChild(circle)
  }
}

export default CircleSprite
