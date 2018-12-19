import { Text as $Text } from 'pixi.js'
import { FT } from '../core'
import { entitify } from '../ecs'

class Text extends $Text {
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

entitify.addMethods(Text.prototype)

export default Text
