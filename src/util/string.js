import stringLength from 'string-length'

export const length = stringLength

/**
 * Safe substring of Unicode characters.
 *
 * @param {string} string a string.
 * @param {number} start index for start point.
 * @param {number} end index for end point.
 * @return {string} a new string containing the specified part of the given string.
 */
export function sub(string, start, end) {
  let substring = ''
  let index = 0

  for (const char of string) {
    if (index >= start && index < end) {
      substring += char
    }
    index += 1

    if (index === end) break
  }

  return substring
}

export function shuffle(string) {
  const chars = string.split('')

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = chars[i]
    chars[i] = chars[j]
    chars[j] = temp
  }

  return chars.join('')
}

export default {
  length,
  sub,
  shuffle,
}
