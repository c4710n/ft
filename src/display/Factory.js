/* global require, FT_ENABLE_CANVAS_VIDEO */

import { PIXI } from '../core'
import Spine from './Spine'
import DOM from './DOM'
import HTML5Video from './HTML5Video'
import Mask from './Mask'
import Scroller from './Scroller'
const { Container, Sprite, AnimatedSprite, Text, Graphics } = PIXI

const classMaps = {
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
  classMaps.CanvasVideo = CanvasVideo
}

export function create($class, ...args) {
  let Class

  if (typeof $class === 'string') {
    Class = classMaps[$class]
  } else {
    Class = $class
  }

  const displayObject = new Class(...args)

  return displayObject
}

export default {
  create,
}
