/* eslint-env node */

/**
 * This module scan a directory and generate an array containing metadatas of
 * resources.
 * Currently, this module needs webpack and val-loader.
 *
 * Usage:
 *   import res from '!val-loader?basedir=./basedirOfResources!@2players/ft/res/scan'
 *
 * @example
 * // structure of metadata array.
 * [
 *   {
 *     name: 'playground.bg',
 *     basename: 'bg.jpg',
 *     type: 'image',
 *     url: 'media/bg.585ec2df.jpg'
 *   },
 *   // ...
 * ]
 */

const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')

module.exports = ({ basedir } = {}) => {
  const _dir = fs.realpathSync(basedir)

  const self = __filename
  const paths = fg.sync([`${_dir}/**/*`]).filter(i => i !== self)
  const resources = paths.map(($path, index) => {
    const extname = path.extname($path)
    const basename = path.basename($path)

    const sepRE = new RegExp(`${path.sep}`, 'g')
    const name = $path
      .replace(addSep(_dir), '') // remove useless prefix
      .replace(sepRE, '.')
      .replace(extname, '')

    const module = `resource${index}`
    const type = detectType(extname)

    return {
      module,
      name,
      basename,
      type,
      path: $path,
    }
  })

  const imports = resources
    .map(({ module, path }) => `import ${module} from '${path}'`)
    .join('\n')
  const objects = resources
    .map(
      ({ module, name, basename, type }) =>
        `  {name: '${name}', basename: '${basename}', type: '${type}', url: ${module}}`
    )
    .join(',\n')

  const code = `
${imports}
const objects = [
${objects}
]

objects.url = function(name, { type, basename = false } = {}) {
  const resource = this.find(resource => {
    if (basename) {
      return resource.basename === name
    } else {
      if (type) {
        return resource.name === name && resource.type === type
      } else {
        return resource.name === name
      }
    }
  })

  if (!resource) {
    throw new Error("[res scanner] can't find resource - " + name + "(" + type + ")")
  }

  const { url } = resource
  return url
}

objects.nu = function(name, { type } = {}) {
  const url = this.url(name, { type })
  return [name, url]
}

objects.type = function(name) {
  const resource = this.find(resource => resource.name === name)
  const { type } = resource
  return type
}

objects.group = function(prefix, { type } = {}) {
  let resources = this.filter(({ name }) => name.startsWith(prefix))

  if (type) {
    resources = resources.filter(({ type: $type }) => $type === type)
  }

  return resources
}

export default objects
`
  return { code }
}

function addSep(p) {
  const { sep } = path
  return p.endsWith(sep) ? p : `${p}${sep}`
}

function detectType(extname) {
  const types = [
    {
      type: 'image',
      re: /\.(png|jpg|jpeg|gif)/,
    },
    {
      type: 'audio',
      re: /\.(mp3|m4a)/,
    },
    {
      type: 'video',
      re: /\.(mp4)/,
    },
    {
      // deprecated: format for jsmpeg
      type: 'mpegts',
      re: /\.(ts)/,
    },
    {
      // format for jsmpeg
      type: 'mpeg',
      re: /\.(mpeg)/,
    },
    {
      type: 'json',
      re: /\.(json)/,
    },
    {
      type: 'atlas',
      re: /\.(atlas)/,
    },
    {
      type: 'font',
      re: /\.(ttf|woff2|woff|otf|eot)/,
    },
    {
      type: 'text',
      re: /\.(txt|cfg)/,
    },
  ]

  for (const { type, re } of types) {
    if (re.test(extname)) {
      return type
    }
  }

  return 'unknown'
}
