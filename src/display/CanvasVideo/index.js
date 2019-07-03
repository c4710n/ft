import Video from '../Video'
import DOM from '../DOM'
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
class CanvasVideo extends Video {
  constructor(...args) {
    super(...args)
  }

  createVideoPlayer(url, { layer, poster, loop } = {}) {
    const video = new DOM('canvas', { layer }).setOrigin(0.5)
    this.video = video
    this.addChild(video)

    const posterURL = poster
    const options = {
      canvas: video,
      poster: posterURL,
      loop,
      videoBufferSize: 2048 * 1024, // 1024 means 1KB
      onEnded: this.onEnd,
    }
    const videoPlayer = new JSMpeg.Player(url, options)
    return videoPlayer
  }

  nativePlay() {
    super.nativePlay()

    return new Promise(resolve => {
      this.videoPlayer.play()
      resolve()
    })
  }

  nativePause() {
    super.nativePause()

    return new Promise(resolve => {
      this.videoPlayer.pause()
      resolve()
    })
  }
}

export default CanvasVideo
