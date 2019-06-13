import { Layer, PIXI } from '../../core'
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
 * const video = new CanvasVideo(url)
 *
 * // play
 * video.play()
 */
class CanvasVideo extends PIXI.Container {
  /**
   * @param {string} url='' url of video
   * @param {Object} options
   */
  constructor(
    url,
    {
      autoplay = false,
      loop = false,
      layer = Layer.DOM_DISPLAY,
      posterURL,
    } = {}
  ) {
    super()

    const video = new DOM('canvas', { layer }).setOrigin(0.5)
    this.videoPlayer = this.createVideoPlayer(video.dom, url, {
      autoplay,
      loop,
      poster: posterURL,
    })
    this.video = video
    this.addChild(video)

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
    this.$spinner = new Spinner()
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
  createVideoPlayer(canvas, url, { autoplay, loop, poster } = {}) {
    const options = {
      canvas,
      poster,
      autoplay,
      loop,
      videoBufferSize: 2048 * 1024, // 1024 means 1KB
      onEnded: this.onEnd,
    }
    const videoPlayer = new JSMpeg.Player(url, options)
    return videoPlayer
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
  onAdded() {}

  /**
   * @ignore
   */
  onRemoved() {}

  /**
   * @ignore
   *
   * @emits {progress}
   */
  onUpdate() {
    const { currentTime } = this.videoPlayer
    if (this.isPlaying) {
      this.$spinnerTimer.reset()
      this.hideSpinner()
      this.emit('progress', currentTime)
    } else if (this.isPaused) {
      this.hideSpinner()
    }

    this.$previousTime = currentTime
  }

  unlock() {}

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
    this.videoPlayer.currentTime = this.$readyTime
  }

  /**
   * Show current video.
   *
   * @emits {show}
   */
  show() {
    this.emit('show')
    this.videoPlayer.style.zIndex = Layer.DOM_DISPLAY
  }

  /**
   * Hide current video.
   *
   * @emits {hide}
   */
  hide() {
    this.emit('hide')
    this.videoPlayer.style.zIndex = Layer.DOM_DISPLAY_HIDDEN
  }

  /**
   * @ignore
   */
  nativePlay() {
    this.$playing = true
    this.$spinnerTimer.start()

    return new Promise(resolve => {
      this.videoPlayer.play()
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
      this.videoPlayer.pause()
      resolve()
    })
  }

  /**
   * Get duration of video.
   */
  get duration() {
    return this.videoPlayer.duration
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
    return this.videoPlayer.currentTime
  }

  /**
   * Set current time of video.
   */
  set currentTime(value) {
    this.videoPlayer.currentTime = value
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

export default CanvasVideo
