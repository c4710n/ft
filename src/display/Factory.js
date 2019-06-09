/* global require, FT_ENABLE_CANVAS_VIDEO */

import { PIXI } from '../core'
import Spine from './Spine'
import DOM from './DOM'
import HTML5Video from './HTML5Video'
import Mask from './Mask'
import Scroller from './Scroller'
const { Container, Sprite, AnimatedSprite, Text, Graphics } = PIXI

const factories = {
  Container,
  Sprite,
  AnimatedSprite,
  Text,
  Graphics,
  Spine,
  DOM,
  HTML5Video,
  Mask,
  Scroller,
}

if (FT_ENABLE_CANVAS_VIDEO) {
  const CanvasVideo = require('./CanvasVideo')
  factories.CanvasVideo = CanvasVideo
}

export function create(nameOrFactory, ...args) {
  let displayObject

  if (typeof nameOrFactory === 'string') {
    const factory = factories[nameOrFactory]

    if (factory.isFunction) {
      displayObject = factory(...args)
    } else {
      displayObject = new factory(...args)
    }
  } else {
    const Class = nameOrFactory
    displayObject = new Class(...args)
  }

  return displayObject
}

export default {
  create,
}
