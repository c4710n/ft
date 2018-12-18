import { Component } from '../ecs'

class Widget extends Component {
  constructor(
    { top, bottom, left, right } = { top: 0, bottom: 0, left: 0, right: 0 }
  ) {
    super('widget')

    // NOTE: top and bottom can't be set in the same time, add guard later.
    if (top !== undefined) this.top = top
    if (bottom !== undefined) this.bottom = bottom

    // NOTE: left and right can't be set in the same time, add guard later.
    if (left !== undefined) this.left = left
    if (right !== undefined) this.right = right
  }
}

export default Widget
