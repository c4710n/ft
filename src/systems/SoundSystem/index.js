import System from '../System'
import sound from 'pixi-sound'
import events from '../../events'

class SoundSystem extends System {
  constructor() {
    super('sound')

    events.show.on(() => {
      sound._context.paused = false
      sound._context.refreshPaused()
    })

    events.hide.on(() => {
      sound._context.paused = true
      sound._context.refreshPaused()
    })
  }
}

export default SoundSystem
