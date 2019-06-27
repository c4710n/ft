import app from '../app'
import { classname, qs } from '../utils'

class SceneManager {
  constructor() {
    /**
     * Store all registered scenes.
     * @access private
     */
    this.availableScenes = []

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
    this.availableScenes.push({
      name,
      Class,
    })
  }

  /**
   * Load scene which is already registered. This method will remove all scenes
   * which aren't sticky.
   *
   * @param {string} name name of scene
   * @param {Object} [options]
   * @param {boolean} [options.sticky=false] scene will not be removed unless
   *                                         you unload it explicitly
   * @param {boolean} [options.oneOff=false] scene is one-off, when the scene is removed,
   *                                         related textures will be destroyed
   * @return {boolean} load is done or not
   */
  async load(name, { sticky = false, oneOff = false, index } = {}) {
    const scene = this.findScene(name)

    const { Class, name: $name } = scene
    const nextScene = new Class($name)
    nextScene.sticky = sticky
    nextScene.oneOff = oneOff

    if (typeof index === 'number') {
      app.stage.addChildAt(nextScene, index)
    } else {
      app.stage.addChild(nextScene)
    }

    const transitions = []
    if (this.currentScene?.transitionOut) {
      transitions.push(this.currentScene.transitionOut())
    }
    if (nextScene?.transitionIn) {
      transitions.push(nextScene.transitionIn())
    }
    await Promise.all(transitions)

    this.currentScene = nextScene

    this.cleanup()
    return true
  }

  async launch(name, { unique = false, oneOff = false, index } = {}) {
    if (unique && this.get(name)) return

    const scene = this.findScene(name)
    const { Class, name: $name } = scene
    const launchedScene = new Class($name)
    launchedScene.launched = true
    launchedScene.oneOff = oneOff

    if (typeof index === 'number') {
      app.stage.addChildAt(launchedScene, index)
    } else {
      app.stage.addChild(launchedScene)
    }

    if (launchedScene?.transitionIn) {
      await launchedScene.transitionIn()
    }

    return true
  }

  async launchExisting(
    scene,
    { unique = false, shouldDestroy = true, oneOff = false, index } = {}
  ) {
    if (unique && this.get(scene)) return

    scene.launched = true
    scene.shouldDestroy = shouldDestroy
    scene.oneOff = oneOff

    if (typeof index === 'number') {
      app.stage.addChildAt(scene, index)
    } else {
      app.stage.addChild(scene)
    }

    if (scene?.transitionIn) {
      await scene.transitionIn()
    }

    return true
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
    app.stage.children.forEach(scene => {
      if (scene.sticky || scene.launched || scene === this.currentScene) return

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
   * @param {string} name name of scene
   */
  async unload(name) {
    const scene = app.stage.children.find(s => s.name === name)
    if (scene) {
      if (scene?.transitionOut) {
        await scene.transitionOut()
      }

      app.stage.removeChild(scene)

      if (scene.shouldDestroy) {
        scene.destroy({
          children: true,
          texture: scene.oneOff,
          baseTexture: scene.oneOff,
        })
      }
    }
  }

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

  findScene(name) {
    const scene = this.availableScenes.find(s => s.name === name)
    if (!scene) {
      throw `[${classname(this)}] failed to load unregistered scene - ${name}`
    }
    return scene
  }
}

SceneManager.default = new SceneManager()

export default SceneManager
