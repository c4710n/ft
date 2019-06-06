import Reconciler from 'react-reconciler'
import hostconfig from './hostconfig'
import invariant from 'fbjs/lib/invariant'
import * as PIXI from 'pixi.js-legacy'

import { TYPES } from './utils/element'

const PixiFiber = Reconciler(hostconfig)

// cache root containers
export const roots = new Map()

/**
 * Custom Renderer
 * Use this without React-DOM
 *
 * @param {*} element
 * @param {PIXI.Container} container (i.e. the Stage)
 * @param {Function} callback
 */
function render(element, container, callback = undefined) {
  invariant(
    PIXI.Container.prototype.isPrototypeOf(container),
    'Invalid argument `container`, expected instance of `PIXI.Container`.'
  )

  let root = roots.get(container)
  if (!root) {
    // get the flushed fiber container
    root = PixiFiber.createContainer(container)
    roots.set(container, root)
  }

  // schedules a top level update
  PixiFiber.updateContainer(element, root, undefined, callback)

  // return the root instance
  return PixiFiber.getPublicRootInstance(root)
}

export default {
  render,
}

export const Text = TYPES.Text
export const Sprite = TYPES.Sprite
