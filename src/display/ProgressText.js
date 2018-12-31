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
  constructor() {
    super()

    /**
     * @ignore
     */
    this.$progress = 0
  }

  onAdded() {
    const content = new PIXI.Text('Loading... 0%', {
      fontSize: 38,
      fontFamily: 'Arial',
      fill: 0x69e5ff,
    })

    /**
     * @ignore
     */
    this.content = content

    this.addChild(content)
  }

  onUpdate() {
    const progress = this.$progress.toFixed(0)
    this.content.text = `Loading... ${progress}%`
  }

  get progress() {
    return this.$progress
  }

  set progress(v) {
    this.$progress = v
  }
}

export default ProgressText
