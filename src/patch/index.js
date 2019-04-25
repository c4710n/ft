import patchDisplayObjectLifecycle from './patchDisplayObjectLifecycle'

export {
  default as patchDisplayObjectMethods,
} from './patchDisplayObjectMethods'

export default function patch() {
  patchDisplayObjectLifecycle()
}
