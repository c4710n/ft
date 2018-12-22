import PIXI from '#/pixi'

const { Container } = PIXI

class Scene extends Container {
  constructor(name) {
    super()
    this.name = name

    this.init()
  }

  init() {}
}

export default Scene
