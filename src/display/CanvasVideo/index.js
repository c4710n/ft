import EventEmitter from 'eventemitter3'
import Video from '../Video'
import DOM from '../DOM'
import JSMpeg from './vendor/jsmpeg.min'

const EE = new EventEmitter()

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
class CanvasVideo extends Video {
  constructor(...args) {
    super(...args)

    this.isPlayed = false
  }

  createVideoPlayer(url, { layer, poster, loop } = {}) {
    const video = new DOM('canvas', { layer }).setOrigin(0.5)
    this.video = video
    this.addChild(video)

    const posterURL = poster
    const options = {
      canvas: video.dom,
      poster: posterURL,
      loop,
      videoBufferSize: 2048 * 1024, // 1024 means 1KB
      onPlay: () => {
        this.onPlay(this)
      },
      onEnded: this.onEnd,
    }

    const videoPlayer = new JSMpeg.Player(url, options)

    return videoPlayer
  }

  get muted() {
    return this.videoPlayer.volume === 0
  }

  set muted(value) {
    if (value === true) {
      this.videoPlayer.volume = 0
    } else {
      this.videoPlayer.volume = 1
    }
  }

  onPlay(context) {
    if (!context.isPlayed && context.videoPlayer.isPlaying) {
      context.isPlayed = true
      EE.emit('play')
    }
  }

  nativePlay() {
    super.nativePlay()

    const promise = new Promise((resolve) => {
      EE.on('play', resolve)
    })
    this.videoPlayer.play()

    return promise
  }

  nativePause() {
    super.nativePause()

    return new Promise((resolve) => {
      this.videoPlayer.pause()
      resolve()
    })
  }
}

export default CanvasVideo
