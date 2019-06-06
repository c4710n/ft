import System from '../System'
import sound from 'pixi-sound'
import events from '../../events'

class SoundSystem extends System {
  constructor() {
    super('sound')

    events.show.on(() => {
      sound.togglePauseAll()
    })

    events.hide.on(() => {
      sound.togglePauseAll()
    })
  }
}

export default SoundSystem
