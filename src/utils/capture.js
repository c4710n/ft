import PIXI from '#/pixi'

/**
 * Generate DataURL of given display object.
 *
 * @param {DisplayObject} displayObject the display object to be captured.
 * @param {Object} [options]
 * @param {string} [options.format='image/png'] the image's format.
 * @param {number} [options.quality=0.92] a number between 0 and 1 indicating the image quality.
 * @param {number} [options.width] specify another width instead of the width of displayObject
 * @param {number} [options.height] specify another height instead of the height of displayObject.
 * @return {DataURL} the data url of generated image.
 *
 * @example
 * const dataURL = capture(display, { image: 'image/jpeg', quality: 0.7 })
 */
function capture(
  displayObject,
  { format = 'image/png', quality = 0.92, width, height } = {}
) {
  const $width = width !== undefined ? width : displayObject.width
  const $height = height !== undefined ? height : displayObject.height

  const renderer = PIXI.autoDetectRenderer($width, $height)
  const rt = PIXI.RenderTexture.create($width, $height)
  renderer.render(displayObject, rt)
  const dataURL = renderer.extract.canvas(rt).toDataURL(format, quality)

  return dataURL
}

export default capture
