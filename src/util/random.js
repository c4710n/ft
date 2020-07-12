export function randomFloat({ min = 0, max, includeMax = false }) {
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

export function randomInteger({ min = 0, max, includeMax = false }) {
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

export function getRandomElements(array, num) {
  const total = array.length

  const n = num > total ? total : num

  const shuffledArray = array.sort(() => 0.5 - Math.random())
  const selected = shuffledArray.slice(0, n)
  return selected
}

export function getRandomSeparatedElements(array, num) {
  const total = array.length

  const n = num > total ? total : num

  const shuffledArray = array.slice().sort(() => 0.5 - Math.random())
  const selected = shuffledArray.slice(0, n)
  const rest = shuffledArray.slice(n, total)

  return [selected, rest]
}

export function getSequentialRandomSeparatedElements(array, num) {
  const total = array.length

  const n = num > total ? total : num

  const maxSliceEnd = total - n
  const sliceEnd = randomInteger(maxSliceEnd)

  const selected = array.slice(sliceEnd, sliceEnd + n)
  const begin = array.slice(0, sliceEnd)
  const end = array.slice(sliceEnd + n)
  const rest = [].concat(begin, end)

  return [selected, rest]
}

export function getRandomElement(array) {
  const maxIndex = array.length - 1
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1))
  const randomOne = array[randomIndex]
  return randomOne
}

export default random
