/* global FT_PRODUCTION_MODE */
import * as PIXI from 'pixi.js-legacy';
window.PIXI = PIXI;
var utils = PIXI.utils;

if (FT_PRODUCTION_MODE) {
  utils.skipHello();
}
/**
 * @external {PIXI} https://github.com/pixijs/pixi.js/
 */


export default PIXI;
export { Container, Graphics, Sprite, TilingSprite, AnimatedSprite, NineSlicePlane } from 'pixi.js-legacy';
//# sourceMappingURL=PIXI.js.map