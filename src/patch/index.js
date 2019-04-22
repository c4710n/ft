import patchDisplayObjectMethods from './patchDisplayObjectMethods'
import patchDisplayObjectLifecycle from './patchDisplayObjectLifecycle'

function createDisplayObject(Class, ...args) {
  const displayObject = new Class(...args)

  patchDisplayObjectMethods(displayObject)

  return displayObject
}

patchDisplayObjectLifecycle()

export default {
  createDisplayObject,
}
