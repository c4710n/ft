import { FT, Layer } from '#/core'
import PIXI from '#/pixi'
import transformDOM from '#/utils/dom'
import { Timer } from '#/utils'
import Spinner from './Spinner'

/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = FT.create(Video, url, {
 *   width: 750,
 *   height: 1500,
 * })
 *
 * // unlock
 * video.unlock()
 *
 * // play
 * video.play()
 */
class HTML5Video extends PIXI.Container {
  /**
   * @param {string} src='' url of video
   * @param {Object} options
   * @param {string} [options.id=''] id of video
   * @param {number} [options.width=640] width of video
   * @param {number} [options.height=320] height of video
   * @param {boolean} [options.loop=false] enable loop
   * @param {boolean} [options.hide=false] hide video after creating it
   */
  constructor(
    src,
    { id = '', width = 640, height = 320, loop = false, hide = false } = {}
  ) {
    super()

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
    this.$width = width
    /**
     * @ignore
     */
    this.$height = height
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
    this.$video = this.createVideoDOM()
    /**
     * @ignore
     */
    this.$container = null
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
    this.$spinnerTimer = new Timer(500)
    /**
     * @ignore
     */
    this.$spinnerChecker = null
  }

  /**
   * Create video DOM.
   * @ignore
   */
  createVideoDOM() {
    const video = document.createElement('video')
    video.src = this.$src

    // identifiers
    video.className = 'ft-video'
    if (this.$id) video.id = this.$id

    // standard adaptation
    video.style.position = 'absolute'
    video.style.top = '0'
    video.style.left = '0'
    video.style.zIndex = this.$hide
      ? Layer.DOM_DISPLAY_HIDDEN
      : Layer.DOM_DISPLAY
    if (this.$width) video.style.width = `${this.$width}px`
    if (this.$height) video.style.height = `${this.$height}px`

    video.loop = this.$loop
    video.crossorigin = 'anonymous'
    video.setAttribute('preload', 'auto')
    video.setAttribute('playsinline', '')

    // WebKit-based browser adaptation
    video.setAttribute('webkit-playsinline', '')

    // QQ Browser on iOS
    const ua =
      window && window.navigator && window.navigator.userAgent
        ? window.navigator.userAgent
        : ''
    const IOS_PATTERN = /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i
    const QQ_BROWSER_UA_PATTERN = /m?(qqbrowser)[\/\s]?([\w\.]+)/i // eslint-disable-line
    if (IOS_PATTERN.test(ua) && QQ_BROWSER_UA_PATTERN.test(ua)) {
      video.setAttribute('x5-playsinline', '')
    }

    return video
  }

  /**
   * @ignore
   */
  onAdded() {
    this.$container = FT.container

    const { $video: video } = this
    this.transfor$video()

    video.addEventListener('ended', this.onEnd)
    this.$container.appendChild(video)
  }

  /**
   * Resize and position current video DOM according stage's setting.
   * @access private
   */
  transfor$video = () => {
    const { localTransform: matrix } = FT.internal.stage
    transformDOM(this.$video, matrix)
  }

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    const { currentTime } = this.$video
    this.emit('progress', currentTime)

    this.transfor$video()
  }

  /**
   * @ignore
   */
  onRemoved() {
    const { $video: video } = this
    if (!video) return

    video.removeEventListener('ended', this.onEnd)
    this.$container.removeChild(video)
  }

  /**
   * @ignore
   */
  addSpinnerChecker() {
    const timer = this.$spinnerTimer
    timer.start()

    const spinnerChecker = () => {
      // stuck due to lacking of data
      if (this.$playing && this.currentTime === this.$staledCurrentTime) {
        timer.tick()

        if (timer.exceed()) {
          this.showSpinner()
        }
      } else {
        timer.reset()
        this.$staledCurrentTime = this.currentTime
        this.hideSpinner()
      }
    }

    this.$spinnerChecker = spinnerChecker
    FT.ticker.add(spinnerChecker, this)
  }

  /**
   * @ignore
   */
  removeSpinnerChecker() {
    if (!this.$spinnerChecker) return
    FT.ticker.remove(this.$spinnerChecker, this)
  }

  /**
   * @ignore
   */
  showSpinner() {
    if (this.$spinner.added) return
    this.$spinner.position.set(FT.stage.centerX, FT.stage.centerY)
    FT.internal.stage.addChild(this.$spinner)
  }

  /**
   * @ignore
   */
  hideSpinner() {
    if (!this.$spinner.added) return
    FT.internal.stage.removeChild(this.$spinner)
  }

  /**
   * @ignore
   */
  nativePlay() {
    this.$playing = true
    this.addSpinnerChecker()
    return this.$video.play()
  }

  /**
   * @ignore
   */
  nativePause() {
    this.$playing = false
    this.removeSpinnerChecker()
    return this.$video.pause()
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
   * @ignore
   * @emits {end}
   */
  onEnd = () => {
    this.emit('end')
    this.removeSpinnerChecker()
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
   * Get duration of video.
   */
  get duration() {
    return this.$video.duration
  }

  /**
   * Get current time of video.
   */
  get currentTime() {
    return this.$video.currentTime
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
}

export default HTML5Video
