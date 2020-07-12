import app from '../app'

const LIMIT_BIG = 1392 / 750
const LIMIT_MIDDLE = 1150 / 750

function getRatio() {
  const { height, width } = app.systems.scale.bounds
  const ratio = height / width

  return ratio
}

function isBig() {
  const ratio = getRatio()
  return ratio >= LIMIT_BIG
}

function isMiddle() {
  const ratio = getRatio()
  return ratio < LIMIT_BIG && ratio >= LIMIT_MIDDLE
}

function isSmall() {
  const ratio = getRatio()
  return ratio < LIMIT_MIDDLE
}

export default {
  isBig,
  isMiddle,
  isSmall,
}
