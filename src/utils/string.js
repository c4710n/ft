import stringLength from 'string-length'

export const length = stringLength

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

export default {
  length,
  sub,
}
