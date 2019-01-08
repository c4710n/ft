import PIXI from '#/pixi'

/**
 * Generate DataURL of given display object.
 *
 * @param {DisplayObject} displayObject the display object to be captured.
 * @return {DataURL} the data url of generated image.
 */
function capture(displayObject) {
  const { width, height } = displayObject

  const renderer = PIXI.autoDetectRenderer(width, height)
  const rt = PIXI.RenderTexture.create(width, height)
  renderer.render(displayObject, rt)
  const dataURL = renderer.extract.base64(displayObject)

  return dataURL
}

export default capture
