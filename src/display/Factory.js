import { patchDisplayObjectMethods } from '../patch'
import PIXI from '../pixi'

export function create($class, ...args) {
  let Class

  if (typeof $class === 'string') {
    Class = PIXI[$class]
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
