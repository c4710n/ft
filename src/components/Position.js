import { Component } from '../ecs'
import { classname } from '../utils'

class Position extends Component {
  constructor(
    { top, bottom, left, right } = { top: 0, bottom: 0, left: 0, right: 0 }
  ) {
    super('position')

    if (top !== undefined && bottom !== undefined) {
      throw new Error(
        `[${classname(this)}] can't set 'top' and 'bottom' in the same time`
      )
    }
    if (top !== undefined) this.top = top
    if (bottom !== undefined) this.bottom = bottom

    if (top !== undefined && bottom !== undefined) {
      throw new Error(
        `[${classname(this)}] can't set 'left' and 'right' in the same time`
      )
    }
    if (left !== undefined) this.left = left
    if (right !== undefined) this.right = right
  }
}

export default Position
