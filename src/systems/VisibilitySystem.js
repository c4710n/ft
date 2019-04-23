// import PIXI from '../pixi'
import System from './System'

/**
 * System for Tween.
 */
class VisibilitySystem extends System {
  constructor(...args) {
    super(...args)

    this.onChange()
  }

  mute() {
    // PIXI.sound.muteAll()
  }

  unmute() {
    // PIXI.sound.unmuteAll()
  }

  onChange() {
    // Set the name of the hidden property and the change event for visibility
    let hidden, visibilityChange
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden'
      visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden'
      visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden'
      visibilityChange = 'webkitvisibilitychange'
    }

    const handleVisibilityChange = () => {
      const isHidden = document[hidden]

      if (isHidden) {
        this.mute()
      } else {
        this.unmute()
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (
      typeof document.addEventListener === 'undefined' ||
      hidden === undefined
    ) {
      // eslint-disable-next-line
      console.log("Current browser doesn't support the Page Visibility API.")
    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false)
    }
  }
}

export default VisibilitySystem
