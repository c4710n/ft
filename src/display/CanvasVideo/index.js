import { FT, Layer } from '../../core'
import DOM from '../DOM'
import { timeout } from '../../time'
import Spinner from '../Spinner'
import JSMpeg from './vendor/jsmpeg.min'

/**
 * Video player based on JSMpeg.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = FT.create('CanvasVideo', url)
 *
 * // play
 * video.play()
 */
class CanvasVideo extends DOM {
  /**
   * @param {string} url='' url of video
   * @param {Object} options
   */
  constructor(url, options = {}) {
    super('canvas')

    /**
     * @ignore
     */
    this.$options = options
    /**
     * @ignore
     */
    this.$video = this.createVideo(this.dom, url)
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
  createVideo(canvas, url) {
    const { loop = false, hide = false } = this.$options
    canvas.style.zIndex = hide ? Layer.DOM_DISPLAY_HIDDEN : Layer.DOM_DISPLAY

    const options = {
      loop,
      canvas,
      videoBufferSize: 2048 * 1024, // 1024 means 1KB
      onEnded: this.onEnd,
    }
    var video = new JSMpeg.Player(url, options)

    return video
  }

  /**
   * @ignore
   */
  onAdded() {
    super.onAdded()
  }

  /**
   * @ignore
   */
  onRemoved() {
    super.onRemoved()
  }

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    super.renderDOM(this.$layer)

    const { currentTime } = this.$video
    if (this.isRealPlaying) {
      this.$spinnerTimer.reset()
      this.hideSpinner()
      this.emit('progress', currentTime)
    }

    this.$previousTime = currentTime
  }

  async unlock() {
    return Promise.resolve()
  }

  play() {
    this.emit('play')
    return this.nativePlay()
  }

  pause() {
    this.emit('pause')
    return this.nativePause()
  }

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

    return new Promise(resolve => {
      this.$video.play()
      resolve()
    })
  }

  /**
   * @ignore
   */
  nativePause() {
    this.$playing = false
    this.$spinnerTimer.stop()

    return new Promise(resolve => {
      this.$video.pause()
      resolve()
    })
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
    this.$playing = false
    this.$spinnerTimer.stop()
    this.hideSpinner()
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

  get isRealPlaying() {
    return this.$playing && this.$video.currentTime > this.$previousTime
  }

  /**
   * @ignore
   */
  showSpinner() {
    if (this.$playing && !this.$spinner.added) {
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

export default CanvasVideo
