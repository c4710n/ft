import { sound } from 'pixi.js'
import { System } from '#/ecs'

class VisibleSystem extends System {
  #hidden
  #visibilityChange

  constructor() {
    super()
    // Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.#hidden = 'hidden'
      this.#visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.#hidden = 'msHidden'
      this.#visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.#hidden = 'webkitHidden'
      this.#visibilityChange = 'webkitvisibilitychange'
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (
      typeof document.addEventListener === 'undefined' ||
      this.#hidden === undefined
    ) {
      // eslint-disable-next-line
      console.warn("Current browser doesn't support the Page Visibility API.")
      return
    }

    // Handle page visibility change
    document.addEventListener(
      this.#visibilityChange,
      this.onVisibilityChange,
      false
    )
  }

  onVisibilityChange = () => {
    if (document[this.#hidden]) {
      sound.muteAll()
      // TODO: pause ticker
    } else {
      sound.unmuteAll()
      // TODO: play ticker
    }
  }
}

export default VisibleSystem
