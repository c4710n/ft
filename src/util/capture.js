import app from '../app'

/**
 * Generate DataURL of given display object.
 *
 * @param {DisplayObject} displayObject the display object to be captured.
 * @param {Object} [options]
 * @param {string} [options.format='image/jpeg'] the image's format.
 * @param {number} [options.quality=0.8] a number between 0 and 1 indicating the image quality.
 * @param {number} [options.width] specify another width instead of the width of displayObject
 * @param {number} [options.height] specify another height instead of the height of displayObject.
 * @return {DataURL} the data url of generated image.
 *
 * @example
 * const dataURL = capture(display, { image: 'image/png', quality: 0.92 })
 */
function capture(
  displayObject,
  { format = 'image/jpeg', quality = 0.8, width, height } = {}
) {
  const $width = width !== undefined ? width : displayObject.width
  const $height = height !== undefined ? height : displayObject.height

  const renderer = app.sharedRenderer
  const rt = app.sharedRenderTexture
  rt.resize($width, $height)
  renderer.render(displayObject, rt)

  const dataURL = renderer.extract.canvas(rt).toDataURL(format, quality)

  return dataURL
}

export default capture
