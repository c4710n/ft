import * as PIXI from 'pixi.js-legacy'
import env from './env'

const { utils } = PIXI
if (env.release) {
  utils.skipHello()
}

/**
 * @external {PIXI} https://github.com/pixijs/pixi.js/
 */

window.PIXI = PIXI

export default PIXI
