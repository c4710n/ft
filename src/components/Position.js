import { Component } from '#/ecs'
import { classname } from '#/utils'

class Position extends Component {
  constructor(
    { anchor, top, bottom, left, right, x, y } = {
      anchor: [0, 0],
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      x: 0,
      y: 0,
    }
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

    if (x !== undefined) this.x = x
    if (y !== undefined) this.y = y

    if (anchor !== undefined) this.anchor = anchor
  }
}

export default Position
