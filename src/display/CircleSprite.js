import { PIXI } from '../core'

const { Container, Sprite, Graphics } = PIXI

class CircleSprite extends Container {
  constructor(texture) {
    super()

    const sprite = new Sprite(texture)

    const { width, height } = sprite
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

    this.addChild(sprite)
  }
}

export default CircleSprite
