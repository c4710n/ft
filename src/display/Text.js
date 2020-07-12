import PIXI from '../core/PIXI'
import { string } from '../util'

const { Container, TextMetrics, Text: TextOrigin, TextStyle } = PIXI

TextMetrics.measureText = measureText

class Text extends Container {
  constructor(text, style = {}, canvas) {
    super()

    const styleObject = new TextStyle(style)
    const { lines } = measureText(text.toString(), styleObject)
    const wrappedText = lines.join('\n')
    const t = new TextOrigin(wrappedText, style, canvas)

    this.t = t
    this.style = style
    this.truncatedText()

    this.addChild(t)
  }

  truncatedText() {
    const { t, style } = this
    const { fixedWidth } = style

    if (fixedWidth === undefined || fixedWidth <= 0) {
      return
    }

    const suffix = '...'
    const suffixWidth = new TextOrigin(suffix, style).width
    const calcWidth = fixedWidth - suffixWidth
    const maxWidth = calcWidth > 0 ? calcWidth : 0

    let truncated = false
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const isShortThanMaxWidth = t.width < maxWidth
      const cannotBeShorten = t.text.length === 0 && t.width >= maxWidth

      if (isShortThanMaxWidth || cannotBeShorten) {
        if (truncated) {
          t.text += suffix
        }

        break
      } else {
        truncated = true
        const text = t.text
        const end = string.length(t.text) - 1
        t.text = string.sub(text, 0, end)
      }
    }
  }

  static concat(textDisplayObjects, { paddingX = 0 } = {}) {
    const container = new Container()

    let currentWidth = 0
    textDisplayObjects.forEach((text, i) => {
      if (i > 0) {
        currentWidth += paddingX
      }

      text.setPositionX(currentWidth)
      currentWidth += text.width

      container.addChild(text)
    })

    return container
  }

  set text(value) {
    this.t.text = value
    this.truncatedText()
  }

  get text() {
    return this.t.text
  }
}

export default Text

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
function measureText(text, style, wordWrap, canvas = TextMetrics._canvas) {
  wordWrap =
    wordWrap === undefined || wordWrap === null ? style.wordWrap : wordWrap
  const font = style.toFontString()
  const fontProperties = TextMetrics.measureFont(font)

  // fallback in case UA disallow canvas data extraction
  // (toDataURI, getImageData functions)
  if (fontProperties.fontSize === 0) {
    fontProperties.fontSize = style.fontSize
    fontProperties.ascent = style.fontSize
  }

  const context = canvas.getContext('2d')

  context.font = font

  const outputText = wordWrap ? wordWrapCJK(text, style, canvas) : text
  const lines = outputText.split(/(?:\r\n|\r|\n)/)
  const lineWidths = new Array(lines.length)
  let maxLineWidth = 0

  for (let i = 0; i < lines.length; i++) {
    const lineWidth =
      context.measureText(lines[i]).width +
      (lines[i].length - 1) * style.letterSpacing

    lineWidths[i] = lineWidth
    maxLineWidth = Math.max(maxLineWidth, lineWidth)
  }
  let width = maxLineWidth + style.strokeThickness

  if (style.dropShadow) {
    width += style.dropShadowDistance
  }

  const lineHeight =
    style.lineHeight || fontProperties.fontSize + style.strokeThickness
  let height =
    Math.max(lineHeight, fontProperties.fontSize + style.strokeThickness) +
    (lines.length - 1) * (lineHeight + style.leading)

  if (style.dropShadow) {
    height += style.dropShadowDistance
  }

  return new TextMetrics(
    text,
    style,
    width,
    height,
    lines,
    lineWidths,
    lineHeight + style.leading,
    maxLineWidth,
    fontProperties
  )
}

function wordWrapCJK(text, style, canvas = TextMetrics._canvas) {
  const context = canvas.getContext('2d')

  let width = 0
  let line = ''
  let lines = ''

  const cache = {}
  const { letterSpacing, whiteSpace } = style

  // How to handle whitespaces
  const collapseSpaces = TextMetrics.collapseSpaces(whiteSpace)
  const collapseNewlines = TextMetrics.collapseNewlines(whiteSpace)

  // whether or not spaces may be added to the beginning of lines
  let canPrependSpaces = !collapseSpaces

  // There is letterSpacing after every char except the last one
  // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!
  // so for convenience the above needs to be compared to width + 1 extra letterSpace
  // t_h_i_s_' '_i_s_' '_a_n_' '_e_x_a_m_p_l_e_' '_!_
  // ________________________________________________
  // And then the final space is simply no appended to each line
  const wordWrapWidth = style.wordWrapWidth + letterSpacing

  // break text into words, spaces and newline chars
  const tokens = TextMetrics.tokenize(text)

  for (let i = 0; i < tokens.length; i++) {
    // get the word, space or newlineChar
    let token = tokens[i]

    // if word is a new line
    if (TextMetrics.isNewline(token)) {
      // keep the new line
      if (!collapseNewlines) {
        lines += TextMetrics.addLine(line)
        canPrependSpaces = !collapseSpaces
        line = ''
        width = 0
        continue
      }

      // if we should collapse new lines
      // we simply convert it into a space
      token = ' '
    }

    // if we should collapse repeated whitespaces
    if (collapseSpaces) {
      // check both this and the last tokens for spaces
      const currIsBreakingSpace = TextMetrics.isBreakingSpace(token)
      const lastIsBreakingSpace = TextMetrics.isBreakingSpace(
        line[line.length - 1]
      )

      if (currIsBreakingSpace && lastIsBreakingSpace) {
        continue
      }
    }

    // get word width from cache if possible
    const tokenWidth = TextMetrics.getFromCache(
      token,
      letterSpacing,
      cache,
      context
    )

    // word is longer than desired bounds
    if (tokenWidth + width > wordWrapWidth) {
      // break large word over multiple lines
      if (TextMetrics.canBreakWords(token, style.breakWords)) {
        // break word into characters
        const characters = token.split('')

        // loop the characters
        for (let j = 0; j < characters.length; j++) {
          let char = characters[j]

          let k = 1
          // we are not at the end of the token

          while (characters[j + k]) {
            const nextChar = characters[j + k]
            const lastChar = char[char.length - 1]

            // should not split chars
            if (
              !TextMetrics.canBreakChars(
                lastChar,
                nextChar,
                token,
                j,
                style.breakWords
              )
            ) {
              // combine chars & move forward one
              char += nextChar
            } else {
              break
            }

            k++
          }

          j += char.length - 1

          const characterWidth = TextMetrics.getFromCache(
            char,
            letterSpacing,
            cache,
            context
          )

          if (characterWidth + width > wordWrapWidth) {
            lines += TextMetrics.addLine(line)
            canPrependSpaces = false
            line = ''
            width = 0
          }

          line += char
          width += characterWidth
        }
      } else {
        // if there are words in this line already
        // finish that line and start a new one
        if (line.length > 0) {
          lines += TextMetrics.addLine(line)
          line = ''
          width = 0
        }

        const isLastToken = i === tokens.length - 1

        // give it its own line if it's not the end
        lines += TextMetrics.addLine(token, !isLastToken)
        canPrependSpaces = false
        line = ''
        width = 0
      }
    } else {
      // don't add spaces to the beginning of lines
      if (
        line.length > 0 ||
        !TextMetrics.isBreakingSpace(token) ||
        canPrependSpaces
      ) {
        // add the word to the current line
        line += token

        // update width counter
        width += tokenWidth
      }
    }
  }

  lines += TextMetrics.addLine(line, false)

  return lines
}
