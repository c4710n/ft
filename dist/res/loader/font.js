import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import WebFont from 'webfontloader';

function generateFontFace(name, url) {
  return "\n@font-face {\n  font-family: \"".concat(name.replace('.', ''), "\";\n  src: url(\"").concat(url, "\");\n}\n");
}
/**
 * @ignore
 */


function fontLoader(resource, next) {
  var extensions = ['ttf'];
  var extension = resource.extension;

  if (extensions.includes(extension)) {
    var name = resource.name,
        url = resource.url;
    var style = document.createElement('style');
    document.head.appendChild(style);
    var styles = generateFontFace(name, url);
    style.sheet.insertRule(styles, 0);
    var config = {};
    config.timeout = Number.POSITIVE_INFINITY;
    config.custom = {
      families: [name]
    };
    config.active = next;
    config.inactive = next;
    WebFont.load(config);
  } else {
    next();
  }
}

export default fontLoader;
//# sourceMappingURL=font.js.map