import PIXI from '../pixi'
// import 'pixi-sound'
import 'pixi-spine'
import { classname } from '../utils'
import { imageLoader as spineImageLoader } from './loader/spine'
import fontLoader from './loader/font'
import { patch as patchSpritesheetLoader } from './loader/spritesheet'

patchSpritesheetLoader()

let $res

/**
 * Resource manager built on the loader provided by PIXI.
 *
 * In FT, resources for `ResManager` must be registered in advance.
 * Because of that, you need to create a standalone module for `ResManager` in
 * order to achieve this.
 *
 * @example
 * // register-resources.js
 * import { ResManager } from 'ft'
 * import resources from '!val-loader?basedir=./res!ft/res/scan.val'
 * ResManager.register(resources)
 *
 * // Above code should be placed in a standalone file,
 * // Then, import `register-resources.js` after importing FT.
 * import { FT } from 'ft'
 * import './register-resources'
 */
class ResManager extends PIXI.Loader {
  constructor(...args) {
    super(...args)

    this.use(fontLoader)

    this.liveSounds = {}
  }

  /**
   * Register metadata of resources generated by res/scan.val.js
   */
  static register(res) {
    $res = res
  }

  get res() {
    return $res
  }

  /**
   * Add an image to loading queue.
   */
  addImage(name) {
    if (this.resources[name]) return
    this.add(...$res.nu(name))
  }

  /**
   * Add a spritesheet to loading queue.
   */
  addSpritesheet(name) {
    const json = this.url(name, { type: 'json' })
    const image = this.url(name, { type: 'image' })

    this.add(name, json, {
      data: {
        meta: { image },
      },
      metadata: { image },
    })
  }

  /**
   * Add a font to loading queue.
   */
  addFont(name) {
    if (this.resources[name]) return
    this.add(...$res.nu(name))
  }

  /**
   * Add a sound to loading queue.
   */
  addSound(name) {
    if (this.resources[name]) return
    this.add(...$res.nu(name))
  }

  /**
   * Add a live sound.
   */
  addLiveSound(name) {
    const url = this.url(name)
    this.liveSounds[name] = new Audio(url)
  }

  /**
   * Add a spine into loading queue.
   */
  addSpine(name) {
    if (this.resources[name]) return

    const json = $res.url(name, { type: 'json' })
    const atlas = $res.url(name, { type: 'atlas' })
    this.add(name, json, {
      metadata: {
        spineAtlasFile: atlas,
        imageLoader: spineImageLoader,
      },
    })
  }

  /**
   * Get url of resource.
   */
  url(...args) {
    return $res.url(...args)
  }

  /**
   * Get a texture by name.
   */
  texture(name) {
    const resource = this.resources[name]
    if (!resource) {
      throw new Error(`[${classname(this)}] missing texture - ${name}`)
    } else {
      return resource.texture
    }
  }
  /**
   * Get textures for animation.
   */
  animationTextures(name, animationName) {
    const spritesheet = this.resources[name]?.spritesheet
    if (!spritesheet) {
      throw new Error(`[${classname(this)}] missing spritesheet - ${name}`)
    }

    const animationTextures = spritesheet?.animations[animationName]
    if (!animationTextures) {
      throw new Error(
        `[${classname(
          this
        )}] missing animation textures - ${name}:${animationName}`
      )
    }

    return animationTextures
  }

  /**
   * Get a sound by name.
   */
  sound(name) {
    const resource = this.resources[name]
    if (!resource) {
      throw new Error(`[${classname(this)}] missing sound - ${name}`)
    } else {
      return resource.sound
    }
  }

  /**
   * Get a live sound by name.
   */
  liveSound(name) {
    const sound = this.liveSounds[name]
    if (!sound) {
      throw new Error(`[${classname(this)}] missing live sound - ${name}`)
    } else {
      return sound
    }
  }

  /**
   * Get a spine by name.
   */
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
