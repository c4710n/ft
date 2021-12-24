import { PIXI } from '../../core'
import System from '../System'
import { SoundLoader, sound } from '@pixi/sound'
import events from '../../events'

// Use HTML Audio
sound.useLegacy = true

PIXI.Loader.registerPlugin(SoundLoader)

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
