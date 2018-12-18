function generateFontFace(name, url) {
  return `
@font-face {
  font-family: "${name}";
  src: url("${url}");
}
`
}

function fontLoader(resource, next) {
  const extensions = ['ttf', 'otf']

  const { extension } = resource
  if (extensions.includes(extension)) {
    const { name, data } = resource
    const blob = new Blob([new Uint8Array(data)])
    const blobURL = URL.createObjectURL(blob)

    const style = document.createElement('style')
    style.type = 'text/css'
    style.media = 'all'
    style.rel = 'stylesheet'

    const head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
    style.innerHTML = generateFontFace(name, blobURL)
  }

  next()
}

export default fontLoader
