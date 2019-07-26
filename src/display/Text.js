import PIXI from '../core/PIXI'

const { Container, TextMetrics, Text: TextOrigin, TextStyle } = PIXI

class Text extends Container {
  constructor(text, style, canvas) {
    super()

    const styleObject = new TextStyle(style)
    const { lines } = measureText(text, styleObject)
    const wrappedText = lines.join('\n')
    const t = new TextOrigin(wrappedText, style, canvas)

    this.addChild(t)
  }
}

export default Text

// following code is fetched from:
// + https://github.com/pixijs/pixi.js/blob/fc70bdd66c19b2d52e42f3653fe43e313cb19566/packages/text/src/TextMetrics.js#L100
// + https://github.com/pixijs/pixi.js/blob/fc70bdd66c19b2d52e42f3653fe43e313cb19566/packages/text/src/TextMetrics.js#L169
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
    if (tokenWidth > wordWrapWidth) {
      // if we are not already at the beginning of a line

      /**
       * m31271n changed here:
       *   don't wrap long line
       */
      // if (line !== '') {
      //   // start newlines for overflow words
      //   lines += TextMetrics.addLine(line)
      //   line = ''
      //   width = 0
      // }

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
      }

      // run word out of the bounds
      else {
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
    }

    // word could fit
    else {
      // word won't fit because of existing words
      // start a new line
      if (tokenWidth + width > wordWrapWidth) {
        // if its a space we don't want it
        canPrependSpaces = false

        // add a new line
        lines += TextMetrics.addLine(line)

        // start a new line
        line = ''
        width = 0
      }

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
