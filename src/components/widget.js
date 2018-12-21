function widget({ top, bottom, left, right } = {}) {
  const name = 'widget'
  const data = {}

  if (top !== undefined && bottom !== undefined) {
    throw new Error(`[${name}] can't set 'top' and 'bottom' in the same time`)
  }
  if (top !== undefined) data.top = top
  if (bottom !== undefined) data.bottom = bottom

  if (top !== undefined && bottom !== undefined) {
    throw new Error(`[${name}] can't set 'left' and 'right' in the same time`)
  }
  if (left !== undefined) data.left = left
  if (right !== undefined) data.right = right

  return {
    name,
    data,
  }
}

export default widget
