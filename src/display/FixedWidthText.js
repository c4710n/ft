import { PIXI } from '../core'
import { string } from '../utils'

const suffix = '...'

/**
 * A mask whose size is equal to viewport's size.
 *
 * @example
 * const mask = FT.create(Mask, { color: 0xff0000, alpha: 0.8 })
 * container.addChild(mask)
 */
class FixedWidthText extends PIXI.Text {
  constructor(text, textWidth = Number.POSITIVE_INFINITY, ...args) {
    super(text, ...args)

    const suffixWidth = new PIXI.Text(suffix, ...args).width

    let truncated = false
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.width < textWidth - suffixWidth) {
        if (truncated) {
          this.text += suffix
        }

        break
      } else {
        truncated = true
        const text = this.text
        const end = this.text.length - 1
        this.text = string.sub(text, 0, end)
      }
    }
  }
}

export default FixedWidthText
