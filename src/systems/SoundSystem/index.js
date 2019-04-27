import System from '../System'
import PIXI from '../../pixi'
import 'pixi-sound'
import events from '../../events'

const { sound } = PIXI

/**
 * System for Tween.
 */
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
