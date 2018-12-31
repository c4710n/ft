import PIXI from '#/pixi'

/**
 * Line for displaying progress.
 *
 * @example
 * const progressText = FT.create(ProgressText)
 * progressText.progress = 10
 *
 * @todo add arguments for customizing style of line.
 */
class ProgressLine extends PIXI.Container {
  constructor() {
    super()

    /**
     * @ignore
     */
    this.$progress = 0

    /**
     * @ignore
     */
    this.$mask = null

    /**
     * @ignore
     */
    this.bg = null
  }

  onAdded() {
    const width = 724
    const height = 10

    const bg = new PIXI.Graphics()
    this.bg = bg
    bg.lineStyle(height, 0x1b3a69, 1)
    bg.moveTo(0, 0)
    bg.lineTo(width, 0)
    bg.endFill()
    this.addChild(bg)

    const mask = new PIXI.Graphics()
    this.$mask = mask
    mask.lineStyle(height, 0x000000, 1)
    mask.moveTo(0, 0)
    mask.lineTo(width, 0)
    mask.endFill()
    mask.width = 0
    this.addChild(mask)

    const fg = new PIXI.Graphics()
    fg.lineStyle(height, 0x69e5ff, 1)
    fg.moveTo(0, 0)
    fg.lineTo(width, 0)
    fg.endFill()
    this.addChild(fg)
    fg.mask = mask
  }

  onUpdate() {
    this.$mask.width = this.bg.width * this.$progress * 0.01
  }

  get progress() {
    return this.$progress
  }

  set progress(v) {
    this.$progress = v
  }
}

export default ProgressLine
