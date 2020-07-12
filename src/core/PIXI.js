/* global FT_PRODUCTION_MODE */
import * as PIXI from 'pixi.js-legacy'

window.PIXI = PIXI

const { utils } = PIXI
if (FT_PRODUCTION_MODE) {
  utils.skipHello()
}

/**
 * @external {PIXI} https://github.com/pixijs/pixi.js/
 */
export default PIXI

export {
  Container,
  Graphics,
  Sprite,
  TilingSprite,
  AnimatedSprite,
  NineSlicePlane,
} from 'pixi.js-legacy'
