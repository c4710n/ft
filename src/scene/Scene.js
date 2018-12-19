import { Container } from 'pixi.js'

class Scene extends Container {
  constructor(name) {
    super()
    this.name = name

    this.init()
  }

  init() {}
}

export default Scene
