import * as PIXI from 'pixi.js-legacy'
import env from './env'

window.PIXI = PIXI

const { Loader, LoaderResource } = PIXI

const { utils } = PIXI
if (env.release) {
  utils.skipHello()
}

export const loaders = {
  Loader: Loader,
  Resource: LoaderResource,
}

Object.assign(PIXI, { loaders })

/**
 * @external {PIXI} https://github.com/pixijs/pixi.js/
 */
export default PIXI
