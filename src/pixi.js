import * as PIXI from 'pixi.js-legacy'
import env from './env'

window.PIXI = PIXI

const { utils } = PIXI
if (env.release) {
  utils.skipHello()
}

/**
 * @external {PIXI} https://github.com/pixijs/pixi.js/
 */
export default PIXI
