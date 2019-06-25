import { PIXI } from '../core'

/**
 * const textStyle = {
 *   trim: true,
 * }
 *
 * const text1 = new Text('collect', textStyle).setOrigin(0, 1)
 * const text2 = new Text('1').setOrigin(0, 1)
 * const text3 = new Text('part').setOrigin(0, 1)
 *
 * const concatedText = new ConcatedText(texts, { paddingX: 20 })
 */
class ConcatedText extends PIXI.Container {
  constructor(textDisplayObjects, { paddingX = 0 } = {}) {
    super()

    let currentWidth = 0
    textDisplayObjects.forEach((text, i) => {
      if (i > 0) {
        currentWidth += paddingX
      }

      text.setPositionX(currentWidth)
      currentWidth += text.width

      this.addChild(text)
    })
  }
}

export default ConcatedText
