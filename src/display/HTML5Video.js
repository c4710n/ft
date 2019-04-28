import { FT, Layer, Device } from '../core'
import DOM from './DOM'
import { timeout } from '../time'
import Spinner from './Spinner'

/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = FT.create(Video, url)
 *
 * // unlock
 * await video.unlock()
 *
 * // play
 * video.play()
 */
class HTML5Video extends DOM {
  /**
   * @param {string} src='' url of video
   * @param {Object} options
   * @param {string} [options.id=''] id of video
   * @param {boolean} [options.loop=false] enable loop
   * @param {boolean} [options.hide=false] hide video after creating it
   */
  constructor(src, { id = '', loop = false, hide = false } = {}) {
    super('video')

    /**
     * @ignore
     */
    this.$layer = Layer.DOM_DISPLAY_HIDDEN
    /**
     * @ignore
     */
    this.$src = src
    /**
     * @ignore
     */
    this.$id = id
    /**
     * @ignore
     */
    this.$loop = loop
    /**
     * @ignore
     */
    this.$hide = hide
    /**
     * @ignore
     */
    this.$video = this.patchVideoDOM(this.dom)
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
    this.$staledCurrentTime = 0
    /**
     * @ignore
     */
    this.$spinner = FT.create(Spinner)
    /**
     * @ignore
     */
    this.$spinnerTimer = timeout(500, () => {
      this.showSpinner()
    })
  }

  /**
   * Create video DOM.
   * @ignore
   */
  patchVideoDOM(video) {
    this.$layer = this.$hide ? Layer.DOM_DISPLAY_HIDDEN : Layer.DOM_DISPLAY

    // identifiers
    if (this.$id) video.id = this.$id

    video.src = this.$src
    video.loop = this.$loop
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

  /**
   * @ignore
   */
  onAdded() {
    super.onAdded()
    this.$video.addEventListener('ended', this.onEnd)
  }

  /**
   * @ignore
   */
  onRemoved() {
    super.onRemoved()
    this.$video.removeEventListener('ended', this.onEnd)
  }

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    super.renderDOM(this.$layer)

    const { currentTime } = this.$video
    if (currentTime !== this.$staledCurrentTime) {
      this.$staledCurrentTime = currentTime
      this.$spinnerTimer.reset()
      this.hideSpinner()
      this.emit('progress', currentTime)
    }
  }
  /**
   * Unlock current video.
   *
   * WARNING: This method can't ensure playing video at a visible position
   * on iOS < 10.3.1, so you need to call await video.play() to avoid black splash.
   *
   * If you need to unlock multiple videos at once, there are 2 conditions because
   * iOS < 10.3.1 don't support playing multiple videos at one time:
   *
   * @example
   * // When you need to support iOS < 10.3.1:
   * video2.unlock()
   * video3.unlock()
   * await video1.unlock()
   * await video1.play()
   *
   * @example
   * // When you need to support iOS > 10.3.1
   * Promise.all([video1.unlock(), video2.unlock(), video3.unlock()])
   * await video1.play()
   *
   * @see https://stackoverflow.com/a/50480115/1793548
   */
  async unlock() {
    const { $video: video } = this
    const { paused: isPausedBeforeUnlock } = video

    await this.nativePlay()
    if (isPausedBeforeUnlock) {
      this.nativePause()
    }
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
    const { $video: video } = this

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
    this.$video.currentTime = this.$readyTime
  }

  /**
   * Show current video.
   *
   * @emits {show}
   */
  show() {
    this.emit('show')
    this.$video.style.zIndex = Layer.DOM_DISPLAY
  }

  /**
   * Hide current video.
   *
   * @emits {hide}
   */
  hide() {
    this.emit('hide')
    this.$video.style.zIndex = Layer.DOM_DISPLAY_HIDDEN
  }

  /**
   * @ignore
   */
  nativePlay() {
    this.$playing = true
    this.$spinnerTimer.start()
    return this.$video.play()
  }

  /**
   * @ignore
   */
  nativePause() {
    this.$playing = false
    this.$spinnerTimer.stop()
    return this.$video.pause()
  }

  /**
   * Get duration of video.
   */
  get duration() {
    return this.$video.duration
  }

  /**
   * @ignore
   * @emits {end}
   */
  onEnd = () => {
    this.emit('end')
    this.$spinnerTimer.stop()
  }

  /**
   * Get current time of video.
   */
  get currentTime() {
    return this.$video.currentTime
  }

  /**
   * Set current time of video.
   */
  set currentTime(value) {
    this.$video.currentTime = value
  }

  /**
   * @ignore
   */
  showSpinner() {
    if (!this.$spinner.added) {
      this.$spinner.position.set(FT.size.centerX, FT.size.centerY)
      this.$spinner.visible = true
      FT.stage.addChild(this.$spinner)
    }
  }

  /**
   * @ignore
   */
  hideSpinner() {
    if (this.$spinner.added) {
      this.$spinner.visible = false
      FT.stage.removeChild(this.$spinner)
    }
  }
}

export default HTML5Video
