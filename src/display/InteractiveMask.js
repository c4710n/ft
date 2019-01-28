import { FT } from '#/core'
import PIXI from '#/pixi'
import { AnimationFade } from '#/components'
import Mask from './Mask'

class InteractiveMask extends PIXI.Container {
  constructor(...args) {
    super()

    const mask = FT.create(Mask, ...args)
    this.addChild(mask)

    this.on('pointerup', this.$remove, this)
  }

  async onAdded() {
    const fade = new AnimationFade('in', { duration: 300 })
    this.addComponent(fade)

    await fade.complete()
    this.enableInteraction()
  }

  async $remove() {
    this.disableInteraction()
    const fade = new AnimationFade('out', { duration: 300 })
    this.addComponent(fade)
    await fade.complete()

    this.parent.removeChild(this)
  }

  enableInteraction() {
    this.interactive = true
  }

  disableInteraction() {
    this.interactive = false
  }
}

export default InteractiveMask
