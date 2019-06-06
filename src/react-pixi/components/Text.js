import * as PIXI from 'pixi.js-legacy'

const Text = (root, props) => {
  const { text = '', style = {} } = props
  return new PIXI.Text(text, style)
}

export default Text
