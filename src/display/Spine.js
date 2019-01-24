import 'pixi-spine'
import PIXI from '#/pixi'

/**
 * @external {Spine} https://github.com/pixijs/pixi-spine
 */
class Spine extends PIXI.spine.Spine {
  constructor(...args) {
    super(...args)

    this.$trackID = 0
  }

  get nextTrackID() {
    const trackID = this.$trackID
    this.$trackID += 1

    return trackID
  }

  playAnimation(
    animationName,
    { loop = false, pause = false, reverse = false } = {}
  ) {
    const trackID = this.nextTrackID
    const track = this.state.setAnimation(trackID, animationName, loop)

    if (pause) {
      track.timeScale = 0
    }

    if (reverse) {
      const duration = track.animationEnd - track.animationStart
      track.trackTime = duration
      track.timeScale = -1
    }

    return track
  }

  playAnimations(animationNameRE, { loop = false, pause = false } = {}) {
    const animationNames = this.state.data.skeletonData.animations
      .filter(animation => animationNameRE.test(animation.name))
      .map(animation => animation.name)

    animationNames.forEach(name => {
      this.playAnimation(name, { loop, pause })
    })
  }

  addEventListener(eventName, callback) {
    const cb = (track, event) => {
      const { name } = event.data

      if (name !== eventName) return
      callback(track, event)
    }

    this.state.addListener({ event: cb })
  }
}

export default Spine
