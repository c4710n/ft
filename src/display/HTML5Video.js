import app from '../app'
import { Layer, Device, PIXI } from '../core'
import DOM from './DOM'
import { timeout } from '../time'
import Spinner from './Spinner'

/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = app.create(Video, url)
 *
 * // unlock
 * await video.unlock()
 *
 * // play
 * await video.play()
 */
class HTML5Video extends PIXI.Container {
  /**
   * @param {string} src='' url of video
   * @param {Object} options
   */
  constructor(url, options = {}) {
    super()

    this.$options = options

    const video = new DOM('video').setOrigin(0.5)
    this.video = video
    this.addChild(video)
    this.videoDOM = this.patchVideoDOM(video.dom, url)

    /**
     * @ignore
     */
    this.$preplayPromise = null
    /**
     * @ignore
     */
    this.$ready = false
    /**
     * @ignore
     */
    this.$readyTime = 0
    /**
     * @ignore
     */
    this.$playing = false
    /**
     * @ignore
     */
    this.$previousTime = 0
    /**
     * @ignore
     */
    this.$spinner = app.create(Spinner)
    /**
     * @ignore
     */
    this.$spinnerTimer = timeout(500, () => {
      if (this.isLoading) {
        this.showSpinner()
      }
    })
  }

  /**
   * Create video DOM.
   * @ignore
   */
  patchVideoDOM(video, url) {
    const {
      loop = false,
      layer = Layer.DOM_DISPLAY,
      controls = false,
    } = this.$options
    video.src = url
    video.loop = loop
    video.controls = controls
    video.style.zIndex = layer
    video.style.objectFit = 'fill'
    video.crossorigin = 'anonymous'
    video.setAttribute('preload', 'auto')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '') // WebKit-based browser adaptation

    // QQ Browser on iOS
    if (Device.isIOS && Device.isQQBrowser) {
      video.setAttribute('x5-playsinline', '')
    }

    return video
  }

  setSize(...args) {
    this.video.setSize(...args)

    return this
  }

  setAngle(...args) {
    this.video.setAngle(...args)

    return this
  }

  /**
   * @ignore
   */
  onAdded() {
    this.videoDOM.addEventListener('ended', this.onEnd)
  }

  /**
   * @ignore
   */
  onRemoved() {
    this.videoDOM.removeEventListener('ended', this.onEnd)
  }

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    const { currentTime } = this

    if (this.isPlaying) {
      this.$spinnerTimer.reset()
      this.hideSpinner()
      this.emit('progress', currentTime)
    } else if (this.isPaused) {
      this.hideSpinner()
    }
    this.$previousTime = currentTime
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
    this.videoDOM.play()
    this.videoDOM.pause()
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
    const { videoDOM: video } = this

    if (this.$ready) {
      this.emit('play')
      return this.nativePlay()
    }

    this.$preplayPromise =
      this.$preplayPromise ||
      new Promise(resolve => {
        const listener = () => {
          const { currentTime } = video
          if (currentTime > 0) {
            video.removeEventListener('timeupdate', listener)
            this.$ready = true
            this.$readyTime = currentTime
            video.muted = false
            this.emit('play')
            resolve()
          }
        }
        video.addEventListener('timeupdate', listener)
        video.muted = true
        this.nativePlay()
      })
    return this.$preplayPromise
  }

  /**
   * Pause current video.
   *
   * @emits {pause}
   * @return {Promise} same as DOM API - `pause()`
   */
  pause() {
    this.emit('pause')
    return this.nativePause()
  }

  /**
   * Reset current video's timeline.
   *
   * @emits {reset}
   */
  reset() {
    this.emit('reset')
    this.videoDOM.currentTime = this.$readyTime
  }

  /**
   * Show current video.
   *
   * @emits {show}
   */
  show() {
    this.emit('show')
    this.videoDOM.style.zIndex = Layer.DOM_DISPLAY
  }

  /**
   * Hide current video.
   *
   * @emits {hide}
   */
  hide() {
    this.emit('hide')
    this.videoDOM.style.zIndex = Layer.DOM_DISPLAY_HIDDEN
  }

  /**
   * @ignore
   */
  nativePlay() {
    this.$playing = true
    this.$spinnerTimer.start()
    return this.videoDOM.play()
  }

  /**
   * @ignore
   */
  nativePause() {
    this.$playing = false
    this.$spinnerTimer.stop()
    return this.videoDOM.pause()
  }

  /**
   * Get duration of video.
   */
  get duration() {
    return this.videoDOM.duration
  }

  /**
   * @ignore
   * @emits {end}
   */
  onEnd = () => {
    this.emit('end')
    this.$playing = false
    this.$spinnerTimer.stop()
    this.hideSpinner()
  }

  /**
   * Get current time of video.
   */
  get currentTime() {
    return this.videoDOM.currentTime
  }

  /**
   * Set current time of video.
   */
  set currentTime(value) {
    this.videoDOM.currentTime = value
  }

  get isLoading() {
    return this.added && this.$playing && this.currentTime <= this.$previousTime
  }

  get isPlaying() {
    return this.added && this.$playing && this.currentTime > this.$previousTime
  }

  get isPaused() {
    return (
      this.added && !this.$playing && this.currentTime == this.$previousTime
    )
  }

  /**
   * @ignore
   */
  showSpinner() {
    if (!this.$spinner.added) {
      this.$spinner.position.set(0, 0)
      this.$spinner.visible = true
      this.addChild(this.$spinner)
    }
  }

  /**
   * @ignore
   */
  hideSpinner() {
    if (this.$spinner.added) {
      this.$spinner.visible = false
      this.removeChild(this.$spinner)
    }
  }
}

export default HTML5Video
