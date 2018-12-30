import { FT, Layer } from '#/core'
import PIXI from '#/pixi'
import transformDOM from '#/utils/dom'
import { Timer } from '#/utils'
import Spinner from './Spinner'

const { Container } = PIXI

/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * const url = 'https://url/to/video'
 * const video = new Video(url, {
 *   width: 750,
 *   height: 1500,
 * })
 *
 * class Theater extends Scene {
 *   init() {
 *     this.addChild(video)
 *   }
 * }
 */
class HTML5Video extends Container {
  #playing
  #staledCurrentTime
  #spinner
  #spinnerTimer
  #spinnerChecker

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
    this.mSrc = src
    /**
     * @ignore
     */
    this.mId = id
    /**
     * @ignore
     */
    this.mWidth = width
    /**
     * @ignore
     */
    this.mHeight = height
    /**
     * @ignore
     */
    this.mLoop = loop
    /**
     * @ignore
     */
    this.mHide = hide

    /**
     * @ignore
     */
    this.mVideo = this.createVideoDOM()
    /**
     * @ignore
     */
    this.mContainer = null
    /**
     * @ignore
     */
    this.mPreplayPromise = null
    /**
     * @ignore
     */
    this.mReady = false
    /**
     * @ignore
     */
    this.mReadyTime = 0

    this.#playing = false
    this.#staledCurrentTime = 0
    this.#spinner = FT.create(Spinner)
    this.#spinnerTimer = new Timer(500)
    this.#spinnerChecker = null
  }

  /**
   * Create video DOM.
   * @access private
   */
  createVideoDOM() {
    const video = document.createElement('video')
    video.src = this.mSrc

    // identifiers
    video.className = 'ft-video'
    if (this.mId) video.id = this.mId

    // standard adaptation
    video.style.position = 'absolute'
    video.style.top = '0'
    video.style.left = '0'
    video.style.zIndex = this.mHide
      ? Layer.DOM_DISPLAY_HIDDEN
      : Layer.DOM_DISPLAY
    if (this.mWidth) video.style.width = `${this.mWidth}px`
    if (this.mHeight) video.style.height = `${this.mHeight}px`

    video.loop = this.mLoop
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
    this.mContainer = FT.container

    const { mVideo: video } = this
    this.transformVideo()

    video.addEventListener('ended', this.onEnd)
    this.mContainer.appendChild(video)
  }

  /**
   * Resize and position current video DOM according stage's setting.
   * @access private
   */
  transformVideo = () => {
    const { localTransform: matrix } = FT.internal.stage
    transformDOM(this.mVideo, matrix)
  }

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    const { currentTime } = this.mVideo
    this.emit('progress', currentTime)

    this.transformVideo()
  }

  /**
   * @ignore
   */
  onRemoved() {
    const { mVideo: video } = this
    if (!video) return

    video.removeEventListener('ended', this.onEnd)
    this.mContainer.removeChild(video)
  }

  addSpinnerChecker() {
    const timer = this.#spinnerTimer
    timer.start()

    const spinnerChecker = () => {
      // stuck due to lacking of data
      if (this.#playing && this.currentTime === this.#staledCurrentTime) {
        timer.tick()

        if (timer.exceed()) {
          this.showSpinner()
        }
      } else {
        timer.reset()
        this.#staledCurrentTime = this.currentTime
        this.hideSpinner()
      }
    }

    this.#spinnerChecker = spinnerChecker
    FT.ticker.add(spinnerChecker, this)
  }

  removeSpinnerChecker() {
    if (!this.#spinnerChecker) return
    FT.ticker.remove(this.#spinnerChecker, this)
  }

  showSpinner() {
    if (this.#spinner.added) return
    this.#spinner.position.set(FT.stage.centerX, FT.stage.centerY)
    FT.internal.stage.addChild(this.#spinner)
  }

  hideSpinner() {
    if (!this.#spinner.added) return
    FT.internal.stage.removeChild(this.#spinner)
  }

  nativePlay() {
    this.#playing = true
    this.addSpinnerChecker()
    return this.mVideo.play()
  }

  nativePause() {
    this.#playing = false
    this.removeSpinnerChecker()
    return this.mVideo.pause()
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
    const { mVideo: video } = this
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
    const { mVideo: video } = this

    if (this.mReady) {
      this.emit('play')
      return this.nativePlay()
    }

    this.mPreplayPromise =
      this.mPreplayPromise ||
      new Promise(resolve => {
        const listener = () => {
          const { currentTime } = video
          if (currentTime > 0) {
            video.removeEventListener('timeupdate', listener)
            this.mReady = true
            this.mReadyTime = currentTime
            video.muted = false
            this.emit('play')
            resolve()
          }
        }
        video.addEventListener('timeupdate', listener)
        video.muted = true
        this.nativePlay()
      })
    return this.mPreplayPromise
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
    this.mVideo.currentTime = this.mReadyTime
  }

  /**
   * Get duration of video.
   */
  get duration() {
    return this.mVideo.duration
  }

  /**
   * Get current time of video.
   */
  get currentTime() {
    return this.mVideo.currentTime
  }

  /**
   * Show current video.
   *
   * @emits {show}
   */
  show() {
    this.emit('show')
    this.mVideo.style.zIndex = Layer.DOM_DISPLAY
  }

  /**
   * Hide current video.
   *
   * @emits {hide}
   */
  hide() {
    this.emit('hide')
    this.mVideo.style.zIndex = Layer.DOM_DISPLAY_HIDDEN
  }
}

export default HTML5Video
