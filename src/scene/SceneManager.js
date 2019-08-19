import app from '../app'
import { classname, qs } from '../utils'

class SceneManager {
  constructor() {
    /**
     * Store all registered scenes.
     * @access private
     */
    this.registeredScenes = []

    /**
     * Store currentc scene
     * @access private
     */
    this.currentScene = null
  }

  /**
   * Register a scene.
   * @param {string} name name of scene
   * @param {Scene} Class subclass of {@link Scene}
   */
  register(name, Class) {
    this.registeredScenes.push({
      name,
      Class,
    })
  }

  /**
   * Start a scene with cleaning up other scenes.
   */
  async load(
    name,
    { args = [], unique = false, oneOff = false, index, translate } = {}
  ) {
    if (unique && this.get(name)) return

    // find registered scene, then create an instance of the scene
    const { Class, name: $name } = this.getRegisteredScene(name)
    const nextScene = new Class($name, ...args)
    nextScene.oneOff = oneOff

    // add instance of scene into stage
    if (typeof index === 'number') {
      app.stage.addChildAt(nextScene, index)
    } else {
      app.stage.addChild(nextScene)
    }

    const { currentScene } = this
    if (translate) {
      // custom logic for translate
      await translate(currentScene, nextScene)
    } else {
      // default logic for translate
      if (currentScene) {
        await currentScene._translateOut()
      }

      await nextScene._translateIn()
    }

    this.currentScene = nextScene

    this.cleanup()

    return true
  }

  /**
   * Start a scene without cleaning up other scenes.
   */
  async launch(
    name,
    { args = [], unique = false, oneOff = false, index } = {}
  ) {
    if (unique && this.get(name)) return

    const { Class, name: $name } = this.getRegisteredScene(name)
    const launchedScene = new Class($name, ...args)
    launchedScene.oneOff = oneOff
    launchedScene.launched = true

    if (typeof index === 'number') {
      app.stage.addChildAt(launchedScene, index)
    } else {
      app.stage.addChild(launchedScene)
    }

    await launchedScene._translateIn()

    return true
  }

  async setCurrent(nameOrScene) {
    const scene = this.get(nameOrScene)
    scene.launched = false
    this.currentScene = scene
  }

  /**
   * Load scene according `scene` field in querystring
   */
  qsload() {
    const qo = qs.parse()
    const { scene: name } = qo

    if (name) {
      return this.load(name)
    } else {
      return false
    }
  }

  /**
   * Cleanup useless actived scenes
   * @access private
   */
  cleanup() {
    const scenes = app.stage.children

    scenes.forEach(scene => {
      if (scene.launched || scene === this.currentScene) {
        return
      }

      app.stage.removeChild(scene)

      scene.destroy({
        children: true,
        texture: scene.oneOff,
        baseTexture: scene.oneOff,
      })
    })
  }

  /**
   * Unload a scene by name explicitly.
   */
  async unload(name, { destroy = true } = {}) {
    const scene = this.get(name)
    if (scene) {
      await scene._translateOut()

      app.stage.removeChild(scene)

      if (destroy) {
        scene.destroy({
          children: true,
          texture: scene.oneOff,
          baseTexture: scene.oneOff,
        })
      }
    }
  }

  /**
   * Get a registered scene.
   */
  getRegisteredScene(name) {
    const scene = this.registeredScenes.find(s => s.name === name)
    if (!scene) {
      throw `[${classname(this)}] failed to get unregistered scene - ${name}`
    }
    return scene
  }

  /**
   * Get a started scene by name or reference.
   */
  get(nameOrScene) {
    let scene

    const scenes = app.stage.children

    if (typeof nameOrScene === 'string') {
      const providedSceneName = nameOrScene
      scene = scenes.find(s => s.name === providedSceneName)
    } else {
      const providedScene = nameOrScene
      scene = scenes.find(s => s === providedScene)
    }

    return scene
  }
}

SceneManager.default = new SceneManager()

export default SceneManager
