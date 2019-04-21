import { FT } from '#/core'
import PIXI from '#/pixi'
import { AnimationFade } from '#/components'
import Mask from './Mask'

class InteractiveMask extends PIXI.Container {
  constructor(...args) {
    super()

    // always enable interactive in order to catch all inputs
    this.interactive = true

    this.isFading = false
    this.animationFadeIn = new AnimationFade('in', { duration: 300 })
    this.animationFadeOut = new AnimationFade('out', { duration: 300 })

    const mask = FT.create(Mask, ...args)
    this.addChild(mask)

    this.on('pointerup', this.$remove, this)
  }

  async onAdded() {
    if (!this.isFading) {
      this.isFading = true

      this.addComponent(this.animationFadeIn)
      await this.animationFadeIn.complete()
      this.removeComponent(this.animationFadeIn)

      this.isFading = false
    }
  }

  async $remove() {
    if (!this.isFading) {
      this.isFading = true

      this.addComponent(this.animationFadeOut)
      await this.animationFadeOut.complete()
      this.removeComponent(this.animationFadeOut)
      this.parent.removeChild(this)

      this.isFading = false
    }
  }
}

export default InteractiveMask
