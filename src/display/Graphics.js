import { Graphics as $Graphics } from 'pixi.js'
import { FT } from '../core'
import { entitify } from '../ecs'

class Graphics extends $Graphics {
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

entitify.addMethods(Graphics.prototype)

export default Graphics
