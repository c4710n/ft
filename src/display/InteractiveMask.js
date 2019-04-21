import { FT } from '#/core'
import PIXI from '#/pixi'
import { AnimationFade } from '#/components'

const { Graphics } = PIXI

class InteractiveMask extends PIXI.Container {
  constructor({ color = 0x00000, alpha = 0.5 } = {}) {
    super()

    // always enable interactive in order to catch all inputs
    // this.interactive = true

    this.isFading = false
    this.animationFadeIn = new AnimationFade('in', { duration: 300 })
    this.animationFadeOut = new AnimationFade('out', { duration: 300 })

    const mask = this.createMask(color, alpha)
    mask.interactive = true
    this.addChild(mask)

    mask.on('pointerup', this.$remove, this)
  }

  createMask(color, alpha) {
    const mask = new Graphics()
    const { width, height } = FT.stage

    mask.beginFill(color)
    mask.drawRect(0, 0, width, height)
    mask.endFill()
    mask.alpha = alpha

    return mask
  }

  async onAdded() {
    await this.show()
  }

  async $remove() {
    await this.hide()

    if (!this.isFading) {
      this.parent.removeChild(this)
    }
  }

  async show() {
    if (!this.isFading) {
      this.isFading = true
      this.addComponent(this.animationFadeIn)
      await this.animationFadeIn.complete()
      this.removeComponent(this.animationFadeIn)
      this.isFading = false
    }
  }

  async hide() {
    if (!this.isFading) {
      this.isFading = true
      this.addComponent(this.animationFadeOut)
      await this.animationFadeOut.complete()
      this.removeComponent(this.animationFadeOut)
      this.isFading = false
    }
  }
}

export default InteractiveMask
