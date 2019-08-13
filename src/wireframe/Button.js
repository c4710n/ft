import { Graphics, Text } from '../display'
import { black, white } from './color'

class Button extends Graphics {
  constructor(content, { fontSize = 40 } = {}) {
    super()

    const text = new Text(content, {
      fill: white,
      fontSize,
    })

    const paddingX = text.width * 0.3
    const paddingY = text.width * 0.2
    const borderWidth = text.width + paddingX
    const borderHeight = text.height + paddingY
    this.beginFill(black, 1)
    this.drawRoundedRect(0, 0, borderWidth, borderHeight, borderWidth * 0.01)
    this.endFill()

    text.setOrigin(0.5).setPosition(borderWidth / 2, borderHeight / 2)
    this.addChild(text)
  }
}

export default Button
