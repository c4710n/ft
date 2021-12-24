import app from '../app';
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

function capture(displayObject) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'image/jpeg' : _ref$format,
      _ref$quality = _ref.quality,
      quality = _ref$quality === void 0 ? 0.8 : _ref$quality,
      width = _ref.width,
      height = _ref.height;

  var $width = width !== undefined ? width : displayObject.width;
  var $height = height !== undefined ? height : displayObject.height;
  var renderer = app.sharedRenderer;
  var rt = app.sharedRenderTexture;
  rt.resize($width, $height);
  renderer.render(displayObject, rt);
  var dataURL = renderer.extract.canvas(rt).toDataURL(format, quality);
  return dataURL;
}

export default capture;
//# sourceMappingURL=capture.js.map