function randomFloat({ min = 0, max, includeMax = false }) {
  if (min === 0) {
    if (includeMax) {
      // [0, max]
      const r = Math.random() * (max + 1)
      return r > max ? max : r
    } else {
      // [0, max)
      return Math.random() * max
    }
  } else {
    if (includeMax) {
      // [min, max]
      const r = Math.random() * (max - min + 1) + min
      return r > max ? max : r
    } else {
      // [min, max)
      return Math.random() * (max - min) + min
    }
  }
}

function randomInteger({ min = 0, max, includeMax = false }) {
  if (min === 0) {
    if (includeMax) {
      // [0, max]
      return Math.floor(Math.random() * (max + 1))
    } else {
      // [0, max)
      return Math.floor(Math.random() * max)
    }
  } else {
    if (includeMax) {
      // [min, max]
      return Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      // [min, max)
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
}

function random({ min, max, float = false, includeMax = false }) {
  if (float) {
    return randomFloat({ min, max, includeMax })
  } else {
    return randomInteger({ min, max, includeMax })
  }
}

export default random
