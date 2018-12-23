import { FT } from '#/core'

export function delay(ms) {
  return new Promise(resolve => {
    const start = performance.now()
    const timer = () => {
      const now = performance.now()
      if (now - start > ms) {
        resolve()
        FT.ticker.remove(timer)
      }
    }

    FT.ticker.add(timer)
  })
}

export default {
  delay,
}
