/* eslint-env node */
module.exports = function generateConfig(api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3, modules: false }],
  ]

  const plugins = [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '#',
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
  ]

  const exclude = ['./src/res/scan.val.js']

  return {
    presets,
    plugins,
    exclude,
  }
}
