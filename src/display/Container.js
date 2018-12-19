import { Container as $Container } from 'pixi.js'
import { FT } from '../core'
import { entitify } from '../ecs'

class Container extends $Container {
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

entitify.addMethods(Container.prototype)

export default Container
