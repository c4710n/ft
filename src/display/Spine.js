import { PIXI } from '../core'
import 'pixi-spine'

/**
 * @external {Spine} https://github.com/pixijs/pixi-spine
 */
class Spine extends PIXI.spine.Spine {
  constructor(...args) {
    super(...args)

    this.$trackID = 0
    this.$tracks = {}
  }

  get nextTrackID() {
    const trackID = this.$trackID
    this.$trackID += 1

    return trackID
  }

  setupPose() {
    this.skeleton.setSlotsToSetupPose()
    return this
  }

  getCurrentAnimationName(trackID) {
    return this.state.getCurrent(trackID)?.animation?.name
  }

  setDefaultMix(time) {
    this.stateData.defaultMix = time
    return this
  }

  playAnimation(
    animationName,
    { loop = false, pause = false, reverse = false, trackID } = {}
  ) {
    const $trackID = trackID !== undefined ? trackID : this.nextTrackID
    const track = this.state.setAnimation($trackID, animationName, loop)

    if (pause) {
      track.timeScale = 0
    }

    if (reverse) {
      const duration = track.animationEnd - track.animationStart
      track.trackTime = duration
      track.timeScale = -1
    }

    this.$tracks[animationName] = track

    return track
  }

  stopAnimation(animationName) {
    const track = this.$tracks[animationName]
    if (track) {
      track.timeScale = 0
    }

    return track
  }

  playAnimations(animationNameRE, { loop = false, pause = false } = {}) {
    const animationNames = this.state.data.skeletonData.animations
      .filter(animation => animationNameRE.test(animation.name))
      .map(animation => animation.name)

    const tracks = animationNames.map(name => {
      return this.playAnimation(name, { loop, pause })
    })

    return tracks
  }

  addCompleteListener(animationName, callback, context) {
    const cb = function(track) {
      const { name } = track.animation
      if (name === animationName) {
        callback.call(context, track)
      }
    }

    this.state.addListener({ complete: cb })
  }

  addEventListener(eventName, callback, context) {
    const cb = function(track, event) {
      const { name } = event.data

      if (name !== eventName) return
      callback.call(context, track, event)
    }

    this.state.addListener({ event: cb })
  }
}

export default Spine
