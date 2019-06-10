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
     * Store all loaded scenes.
     * @access private
     */
    this.loadedScenes = []

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
    const nextScene = app.create(Class, $name)
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

    this.loadedScenes.push(nextScene)
    this.currentScene = nextScene

    this.cleanup()
    return true
  }

  async launch(name, { oneOff = false, index } = {}) {
    const scene = this.findScene(name)

    const { Class, name: $name } = scene
    const launchedScene = app.create(Class, $name)
    launchedScene.launched = true
    launchedScene.oneOff = oneOff

    if (typeof index === 'number') {
      app.stage.addChildAt(launchedScene, index)
    } else {
      app.stage.addChild(launchedScene)
    }
    this.loadedScenes.push(launchedScene)

    if (launchedScene?.transitionIn) {
      await launchedScene.transitionIn()
    }

    return true
  }

  async launchUnique(name, ...args) {
    if (this.get(name)) return
    await this.launch(name, ...args)
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
    this.loadedScenes = this.loadedScenes.filter(scene => {
      if (scene.sticky || scene.launched || scene === this.currentScene) {
        return true
      } else {
        app.stage.removeChild(scene)

        scene.destroy({
          children: true,
          texture: scene.oneOff,
          baseTexture: scene.oneOff,
        })

        return false
      }
    })
  }

  /**
   * Unload a scene by name explicitly.
   * @param {string} name name of scene
   */
  async unload(name) {
    const index = this.loadedScenes.findIndex(s => s.name === name)
    if (index >= 0) {
      const scene = this.loadedScenes[index]

      if (scene?.transitionOut) {
        await scene.transitionOut()
      }

      app.stage.removeChild(scene)
      scene.destroy({
        children: true,
        texture: scene.oneOff,
        baseTexture: scene.oneOff,
      })
      this.loadedScenes.splice(index, 1)
    }
  }

  get(name) {
    const scene = this.loadedScenes.find(s => s.name === name)
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
