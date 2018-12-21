import { classname } from '#/utils'

class Component {
  constructor(name) {
    if (!name) {
      throw new Error(`[${classname(this)}] missing necessary argument - name`)
    }

    this.name = name
  }
}

export default Component
