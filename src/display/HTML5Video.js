import { Device, PIXI } from '../core'
import Video from './Video'
import DOM from './DOM'

/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = new HTML5Video(url)
 *
 * // unlock
 * await video.unlock()
 *
 * // play
 * await video.play()
 */
class HTML5Video extends Video {
  constructor(...args) {
    super(...args)

    this.$preplayPromise = null
    this.$ready = false
  }

  createVideoPlayer(url, { layer, poster, loop, controls } = {}) {
    const video = new DOM('video', { layer }).setOrigin(0.5)
    this.video = video
    this.addChild(video)

    const videoDOM = video.dom
    videoDOM.src = url
    videoDOM.loop = loop
    videoDOM.style.objectFit = 'fill'
    videoDOM.crossorigin = 'anonymous'
    videoDOM.controls = controls
    videoDOM.setAttribute('preload', 'auto')
    videoDOM.setAttribute('playsinline', '')
    videoDOM.setAttribute('webkit-playsinline', '') // WebKit-based browser adaptation
    // QQ Browser on iOS
    if (Device.isIOS && Device.isQQBrowser) {
      videoDOM.setAttribute('x5-playsinline', '')
    }

    const posterTexture = poster
    if (posterTexture) {
      const poster = new PIXI.Sprite(posterTexture).setOrigin(0.5)
      this.addChild(poster)
      this.$poster = poster
    }

    const videoPlayer = videoDOM

    return videoPlayer
  }

  get muted() {
    return this.videoPlayer.muted
  }

  set muted(value) {
    if (value === true) {
      this.videoPlayer.muted = true
    } else {
      this.videoPlayer.muted = false
    }
  }

  onAdded() {
    this.videoPlayer.addEventListener('ended', this.onEnd)
  }

  onRemoved() {
    this.videoPlayer.removeEventListener('ended', this.onEnd)
  }

  setSize(...args) {
    if (this.$poster) {
      this.$poster.setSize(...args)
    }

    return super.setSize(...args)
  }

  setAngle(...args) {
    if (this.$poster) {
      this.$poster.setAngle(...args)
    }

    return super.setAngle(...args)
  }

  /**
   * Unlock current video.
   *
   * @example
   * video1.unlock()
   * video2.unlock()
   * video3.unlock()
   * await video1.play()
   *
   * @see https://stackoverflow.com/a/50480115/1793548
   */
  unlock() {
    this.videoPlayer.play()
    this.videoPlayer.pause()
  }

  /**
   * Play current video.
   *
   * This method will preplay video beforehand. There are following reasons to
   * do this:
   * 1. solve the blinking problem when playing video on Android devices.
   * 2. fetch metadata of video in advance, such as `duration`.
   *
   * @emits {play}
   * @return {Promise} same as DOM API - `play()`
   */
  play() {
    const { videoPlayer } = this

    if (this.$ready) {
      this.emit('play')
      return this.nativePlay()
    }

    this.$preplayPromise =
      this.$preplayPromise ||
      new Promise((resolve) => {
        const listener = () => {
          const { currentTime } = videoPlayer
          if (currentTime > 0) {
            videoPlayer.removeEventListener('timeupdate', listener)
            this.$ready = true
            this.$readyTime = currentTime
            videoPlayer.muted = false
            this.emit('play')
            resolve()
          }
        }
        videoPlayer.addEventListener('timeupdate', listener)
        videoPlayer.muted = true
        this.nativePlay()
      })
    return this.$preplayPromise
  }

  nativePlay() {
    super.nativePlay()
    return this.videoPlayer.play()
  }

  nativePause() {
    super.nativePause()
    return this.videoPlayer.pause()
  }
}

export default HTML5Video
