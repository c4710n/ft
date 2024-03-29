import { PIXI } from '../core'
import fontLoader from './loader/font'
import { patch as patchSpritesheetLoader } from './loader/spritesheet'
import { classname } from '../util'

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

    this.queuedResources = []
    this.use(fontLoader)
  }

  /**
   * Register metadata of resources generated by res/scan.val.js
   */
  static register(res) {
    $res = res
  }

  static async loadImage(url) {
    const name = 'current'

    const $rm = new ResManager()
    $rm.add(name, url)
    await new Promise(function (resolve, reject) {
      $rm.onComplete.add(resolve)
      $rm.onError.add(reject)
      $rm.load()
    })

    return $rm.texture(name)
  }

  get res() {
    return $res
  }

  /**
   * Get url of resource.
   */
  url(...args) {
    return $res.url(...args)
  }

  addImage(name) {
    this.queuedResources.push({ name, type: 'image' })
    return name
  }

  addFont(name) {
    this.queuedResources.push({ name, type: 'webfont' })
    name = name.replace('.', '')
    return name
  }

  addSound(name) {
    this.queuedResources.push({ name, type: 'sound' })
    return name
  }

  addJSON(name) {
    this.queuedResources.push({ name, type: 'json' })
    return name
  }

  addSpritesheet(name) {
    this.queuedResources.push({ name, type: 'spritesheet' })
    return name
  }

  load() {
    for (const resource of this.queuedResources) {
      const { type, name } = resource

      if (this.resources[name]) continue

      switch (type) {
        case 'spritesheet':
          this.loadSpritesheet(name)
          break
        default:
          this.loadGeneralResource(name)
      }
    }

    return super.load()
  }

  /* general loader for loading image, webfont, sound, json */
  loadGeneralResource(name) {
    this.add(...$res.nu(name))
  }

  loadSpritesheet(name) {
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
   * Get sub texture by name.
   */
  subTexture(names, subname) {
    let _names = []

    if (Array.isArray(names)) {
      _names = names
    } else {
      const name = names
      _names.push(name)
    }

    for (const name of _names) {
      const resource = this.resources[name]

      if (!resource) {
        throw new Error(`[${classname(this)}] missing texture - ${name}`)
      } else {
        const subtexture = resource.textures[subname]
        if (subtexture) {
          return subtexture
        } else {
          continue
        }
      }
    }

    throw new Error(`[${classname(this)}] missing subtexture - ${subname}`)
  }

  /**
   * Get textures from spritesheets.
   */
  spritesheetTextures(names) {
    let _names = []

    if (Array.isArray(names)) {
      _names = names
    } else {
      const name = names
      _names.push(name)
    }

    let texturesMap = []

    for (const name of _names) {
      const spritesheet = this.resources[name]?.spritesheet

      if (!spritesheet) {
        throw new Error(`[${classname(this)}] missing spritesheet - ${name}`)
      }

      for (const [name, texture] of Object.entries(spritesheet.textures)) {
        texturesMap.push({ name, texture })
      }
    }

    const textures = texturesMap
      .sort((a, b) => {
        const orderA = Number.parseInt(a.name.replace(/[^0-9]/g, ''))
        const orderB = Number.parseInt(b.name.replace(/[^0-9]/g, ''))

        if (orderA > orderB) {
          return 1
        }

        if (orderA < orderB) {
          return -1
        }

        return 0
      })
      .map((i) => i.texture)

    return textures
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
   * Add a JSON data by name
   */
  json(name) {
    const resource = this.resources[name]
    if (!resource) {
      throw new Error(`[${classname(this)}] missing json - ${name}`)
    } else {
      return resource.data
    }
  }
}

ResManager.default = new ResManager()

export default ResManager
