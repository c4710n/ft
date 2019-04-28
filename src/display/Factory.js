import { patchDisplayObjectMethods } from '../patch'

import PIXI from '../pixi'
import Spine from './Spine'
import DOM from './DOM'
import HTML5Video from './HTML5Video'
import CanvasVideo from './CanvasVideo'
import Mask from './Mask'
import Scroller from './Scroller'
const { Sprite, AnimatedSprite, Text } = PIXI

const classMaps = {
  Sprite,
  AnimatedSprite,
  Text,
  Spine,
  DOM,
  HTML5Video,
  CanvasVideo,
  Mask,
  Scroller,
}

export function create($class, ...args) {
  let Class

  if (typeof $class === 'string') {
    Class = classMaps[$class]
  } else {
    Class = $class
  }

  const displayObject = new Class(...args)

  patchDisplayObjectMethods(displayObject)

  return displayObject
}

export default {
  create,
}
