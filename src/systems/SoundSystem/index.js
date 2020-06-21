import System from '../System'
import sound from './Sound'
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

  muteAll() {
    sound.muteAll()
  }

  unmuteAll() {
    sound.unmuteAll()
  }
}

export default SoundSystem
