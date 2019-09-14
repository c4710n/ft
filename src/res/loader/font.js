import WebFont from 'webfontloader'

function generateFontFace(name, url) {
  return `
@font-face {
  font-family: "${name.replace('.', '')}";
  src: url("${url}");
}
`
}

/**
 * @ignore
 */
function fontLoader(resource, next) {
  const extensions = ['ttf']

  const { extension } = resource
  if (extensions.includes(extension)) {
    const { name, url } = resource

    const style = document.createElement('style')
    document.head.appendChild(style)
    const styles = generateFontFace(name, url)
    style.sheet.insertRule(styles, 0)

    const config = {}
    config.timeout = Number.POSITIVE_INFINITY
    config.custom = { families: [name] }
    config.active = next
    config.inactive = next

    WebFont.load(config)
  } else {
    next()
  }
}

export default fontLoader
