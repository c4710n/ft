function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.date.to-string.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.string.sub.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import PIXI from '../core/PIXI';
import { string } from '../util';
var Container = PIXI.Container,
    TextMetrics = PIXI.TextMetrics,
    TextOrigin = PIXI.Text,
    TextStyle = PIXI.TextStyle;
TextMetrics.measureText = measureText;

var Text = /*#__PURE__*/function (_Container) {
  _inherits(Text, _Container);

  var _super = _createSuper(Text);

  function Text(text) {
    var _this;

    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var canvas = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, Text);

    _this = _super.call(this);
    var styleObject = new TextStyle(style);

    var _measureText = measureText(text.toString(), styleObject),
        lines = _measureText.lines;

    var wrappedText = lines.join('\n');
    var t = new TextOrigin(wrappedText, style, canvas);
    _this.t = t;
    _this.style = style;

    _this.truncatedText();

    _this.addChild(t);

    return _this;
  }

  _createClass(Text, [{
    key: "truncatedText",
    value: function truncatedText() {
      var t = this.t,
          style = this.style;
      var fixedWidth = style.fixedWidth;

      if (fixedWidth === undefined || fixedWidth <= 0) {
        return;
      }

      var suffix = '...';
      var suffixWidth = new TextOrigin(suffix, style).width;
      var calcWidth = fixedWidth - suffixWidth;
      var maxWidth = calcWidth > 0 ? calcWidth : 0;
      var truncated = false; // eslint-disable-next-line no-constant-condition

      while (true) {
        var isShortThanMaxWidth = t.width < maxWidth;
        var cannotBeShorten = t.text.length === 0 && t.width >= maxWidth;

        if (isShortThanMaxWidth || cannotBeShorten) {
          if (truncated) {
            t.text += suffix;
          }

          break;
        } else {
          truncated = true;
          var text = t.text;
          var end = string.length(t.text) - 1;
          t.text = string.sub(text, 0, end);
        }
      }
    }
  }, {
    key: "text",
    get: function get() {
      return this.t.text;
    },
    set: function set(value) {
      this.t.text = value;
      this.truncatedText();
    }
  }], [{
    key: "concat",
    value: function concat(textDisplayObjects) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$paddingX = _ref.paddingX,
          paddingX = _ref$paddingX === void 0 ? 0 : _ref$paddingX;

      var container = new Container();
      var currentWidth = 0;
      textDisplayObjects.forEach(function (text, i) {
        if (i > 0) {
          currentWidth += paddingX;
        }

        text.setPositionX(currentWidth);
        currentWidth += text.width;
        container.addChild(text);
      });
      return container;
    }
  }]);

  return Text;
}(Container);

export default Text;
/**
 * OVERRIDES ORIGINAL PIXI CODE
 * Ensure CJK texts with external spaces is not wrapped:
 *
 *   Billy Brown 不是 1 只狗。
 *
 * PIXI VERSION: 5.1.1
 * + https://github.com/pixijs/pixi.js/blob/40e1e4a12518ee067c6871dcdd930602346197de/packages/text/src/TextMetrics.js#L100
 * + https://github.com/pixijs/pixi.js/blob/40e1e4a12518ee067c6871dcdd930602346197de/packages/text/src/TextMetrics.js#L169
 */

function measureText(text, style, wordWrap) {
  var canvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TextMetrics._canvas;
  wordWrap = wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap;
  var font = style.toFontString();
  var fontProperties = TextMetrics.measureFont(font); // fallback in case UA disallow canvas data extraction
  // (toDataURI, getImageData functions)

  if (fontProperties.fontSize === 0) {
    fontProperties.fontSize = style.fontSize;
    fontProperties.ascent = style.fontSize;
  }

  var context = canvas.getContext('2d');
  context.font = font;
  var outputText = wordWrap ? wordWrapCJK(text, style, canvas) : text;
  var lines = outputText.split(/(?:\r\n|\r|\n)/);
  var lineWidths = new Array(lines.length);
  var maxLineWidth = 0;

  for (var i = 0; i < lines.length; i++) {
    var lineWidth = context.measureText(lines[i]).width + (lines[i].length - 1) * style.letterSpacing;
    lineWidths[i] = lineWidth;
    maxLineWidth = Math.max(maxLineWidth, lineWidth);
  }

  var width = maxLineWidth + style.strokeThickness;

  if (style.dropShadow) {
    width += style.dropShadowDistance;
  }

  var lineHeight = style.lineHeight || fontProperties.fontSize + style.strokeThickness;
  var height = Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) + (lines.length - 1) * (lineHeight + style.leading);

  if (style.dropShadow) {
    height += style.dropShadowDistance;
  }

  return new TextMetrics(text, style, width, height, lines, lineWidths, lineHeight + style.leading, maxLineWidth, fontProperties);
}

function wordWrapCJK(text, style) {
  var canvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TextMetrics._canvas;
  var context = canvas.getContext('2d');
  var width = 0;
  var line = '';
  var lines = '';
  var cache = {};
  var letterSpacing = style.letterSpacing,
      whiteSpace = style.whiteSpace; // How to handle whitespaces

  var collapseSpaces = TextMetrics.collapseSpaces(whiteSpace);
  var collapseNewlines = TextMetrics.collapseNewlines(whiteSpace); // whether or not spaces may be added to the beginning of lines

  var canPrependSpaces = !collapseSpaces; // There is letterSpacing after every char except the last one
  // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!
  // so for convenience the above needs to be compared to width + 1 extra letterSpace
  // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!_
  // ________________________________________________
  // And then the final space is simply no appended to each line

  var wordWrapWidth = style.wordWrapWidth + letterSpacing; // break text into words, spaces and newline chars

  var tokens = TextMetrics.tokenize(text);

  for (var i = 0; i < tokens.length; i++) {
    // get the word, space or newlineChar
    var token = tokens[i]; // if word is a new line

    if (TextMetrics.isNewline(token)) {
      // keep the new line
      if (!collapseNewlines) {
        lines += TextMetrics.addLine(line);
        canPrependSpaces = !collapseSpaces;
        line = '';
        width = 0;
        continue;
      } // if we should collapse new lines
      // we simply convert it into a space


      token = ' ';
    } // if we should collapse repeated whitespaces


    if (collapseSpaces) {
      // check both this and the last tokens for spaces
      var currIsBreakingSpace = TextMetrics.isBreakingSpace(token);
      var lastIsBreakingSpace = TextMetrics.isBreakingSpace(line[line.length - 1]);

      if (currIsBreakingSpace && lastIsBreakingSpace) {
        continue;
      }
    } // get word width from cache if possible


    var tokenWidth = TextMetrics.getFromCache(token, letterSpacing, cache, context); // word is longer than desired bounds

    if (tokenWidth + width > wordWrapWidth) {
      // break large word over multiple lines
      if (TextMetrics.canBreakWords(token, style.breakWords)) {
        // break word into characters
        var characters = token.split(''); // loop the characters

        for (var j = 0; j < characters.length; j++) {
          var _char = characters[j];
          var k = 1; // we are not at the end of the token

          while (characters[j + k]) {
            var nextChar = characters[j + k];
            var lastChar = _char[_char.length - 1]; // should not split chars

            if (!TextMetrics.canBreakChars(lastChar, nextChar, token, j, style.breakWords)) {
              // combine chars & move forward one
              _char += nextChar;
            } else {
              break;
            }

            k++;
          }

          j += _char.length - 1;
          var characterWidth = TextMetrics.getFromCache(_char, letterSpacing, cache, context);

          if (characterWidth + width > wordWrapWidth) {
            lines += TextMetrics.addLine(line);
            canPrependSpaces = false;
            line = '';
            width = 0;
          }

          line += _char;
          width += characterWidth;
        }
      } else {
        // if there are words in this line already
        // finish that line and start a new one
        if (line.length > 0) {
          lines += TextMetrics.addLine(line);
          line = '';
          width = 0;
        }

        var isLastToken = i === tokens.length - 1; // give it its own line if it's not the end

        lines += TextMetrics.addLine(token, !isLastToken);
        canPrependSpaces = false;
        line = '';
        width = 0;
      }
    } else {
      // don't add spaces to the beginning of lines
      if (line.length > 0 || !TextMetrics.isBreakingSpace(token) || canPrependSpaces) {
        // add the word to the current line
        line += token; // update width counter

        width += tokenWidth;
      }
    }
  }

  lines += TextMetrics.addLine(line, false);
  return lines;
}
//# sourceMappingURL=Text.js.map