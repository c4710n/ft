import PIXI from '#/pixi'

/**
 * Text for displaying progress.
 *
 * @example
 * const progressText = FT.create(ProgressText)
 * progressText.progress = 10
 *
 * @todo extends from PIXI.Text.
 * @todo add arguments for customizing template of text.
 */
class ProgressText extends PIXI.Container {
  constructor(
    template = '#%',
    textStyle = {
      fontSize: 42,
      fontFamily: 'sans-serif',
      fill: 0x000000,
    }
  ) {
    super()

    /**
     * @ignore
     */
    this.$progress = 0

    /**
     * @ignore
     */
    this.$template = template

    /**
     * @ignore
     */
    this.$textStyle = textStyle
  }

  genLine(progress) {
    return this.$template.replace('#', progress)
  }

  onAdded() {
    const content = new PIXI.Text(this.genLine(0), this.$textStyle)
    content.anchor.set(0.5)

    /**
     * @ignore
     */
    this.content = content

    this.addChild(content)
  }

  onUpdate() {
    const progress = this.$progress.toFixed(0)
    this.content.text = this.genLine(progress)
  }

  get progress() {
    return this.$progress
  }

  set progress(v) {
    this.$progress = v
  }
}

export default ProgressText
