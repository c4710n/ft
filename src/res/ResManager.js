import 'pixi-sound'
import { loaders } from 'pixi.js'
import { FT } from '../core'
import { advancedImageLoader } from './spine'
import { classname } from '../utils'
import fontLoader from './loader/font'

class ResManager extends loaders.Loader {
  constructor(...args) {
    super(...args)
    this.use(fontLoader)
  }

  /**
   * Add an image into loading queue.
   */
  addImage(name) {
    if (this.resources[name]) return

    const { res } = FT
    this.add(...res.nu(name))
  }

  /**
   * Add a font into loading queue.
   */
  addFont(name) {
    if (this.resources[name]) return

    const { res } = FT
    this.add(...res.nu(name))
  }

  /**
   * Add a sound into loading queue
   */
  addSound(name) {
    if (this.resources[name]) return

    const { res } = FT
    this.add(...res.nu(name))
  }

  /**
   * Add a spine into loading queue.
   */
  addSpine(name) {
    if (this.resources[name]) return

    const { res } = FT
    const json = res.url(name, { type: 'json' })
    const atlas = res.url(name, { type: 'atlas' })
    this.add(name, json, {
      metadata: {
        spineAtlasFile: atlas,
        imageLoader: advancedImageLoader,
      },
    })
  }

  texture(name) {
    const resource = this.resources[name]
    if (!resource) {
      throw new Error(`[${classname(this)}] missing texture - ${name}`)
    } else {
      return resource.texture
    }
  }

  sound(name) {
    const resource = this.resources[name]
    return resource.sound
  }

  spine(name) {
    const resource = this.resources[name]
    if (!resource) {
      throw new Error(`[${classname(this)}] missing spine - ${name}`)
    } else {
      return resource.spineData
    }
  }
}

ResManager.default = new ResManager()

export default ResManager
