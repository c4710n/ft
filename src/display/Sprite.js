import { FT } from '../core'
import { Sprite as $Sprite } from 'pixi.js'
import { entitify } from '../ecs'

class Sprite extends $Sprite {
  constructor(...args) {
    super(...args)

    entitify.addProperties(this)

    this.on('added', () => {
      FT.ecs.addEntity(this)
    })

    this.on('removed', () => {
      FT.ecs.removeEntity(this)
    })
  }
}

entitify.addMethods(Sprite.prototype)

export default Sprite
