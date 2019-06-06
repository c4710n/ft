import System from '../System'
import events from '../../events'

class VisibilitySystem extends System {
  constructor() {
    super('visibility')

    this.listen(events.show.emit, events.hide.emit)
  }

  listen(onShow, onHide) {
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
        onHide()
      } else {
        onShow()
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (
      typeof document.addEventListener === 'undefined' ||
      hidden === undefined
    ) {
      // eslint-disable-next-line
      console.info("Current browser doesn't support the Page Visibility API.")
    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false)
    }
  }
}

export default VisibilitySystem
