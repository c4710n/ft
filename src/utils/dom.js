import { Device } from '#/core'

/**
 * Transform DOM with given matrix.
 *
 * @param {DOM} dom
 * @param {Matrix} matrix
 */
function transformDOM(dom, matrix) {
  const scaleFactor = 1 / Device.DPR
  const { a, b, c, d, tx, ty } = matrix.clone().scale(scaleFactor, scaleFactor)

  const transform = `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`
  const transformOrigin = '0 0 0'

  dom.style.transform = transform
  dom.style.transformOrigin = transformOrigin

  dom.style.webkitTransform = transform
  dom.style.webkitTransformOrigin = transformOrigin
}

export default transformDOM
