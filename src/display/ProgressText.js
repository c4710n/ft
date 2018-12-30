import PIXI from '#/pixi'

const { Container, Text } = PIXI

class ProgressText extends Container {
  #progress

  constructor() {
    super()

    this.#progress = 0
  }

  onAdded() {
    const content = new Text('Loading... 0%', {
      fontSize: 38,
      fontFamily: 'Arial',
      fill: 0x69e5ff,
    })
    this.content = content
    this.addChild(content)
  }

  onUpdate() {
    const progress = this.#progress.toFixed(0)
    this.content.text = `Loading... ${progress}%`
  }

  get progress() {
    return this.#progress
  }

  set progress(v) {
    this.#progress = v
  }
}

export default ProgressText
