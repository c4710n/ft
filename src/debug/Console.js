import { qs } from '#/utils'

/**
 * Load vConsole according querystring. When specified pattern is found in
 * querystring, vConsole will be enabled.
 *
 * @example
 * new Console('debug')
 * // After adding this line, when you visit https://example.com?debug,
 * // vConsole will be loaded
 *
 * @see https://github.com/Tencent/vConsole
 */
class Console {
  /**
   * @param {string} [field='debug'] field will be searched in querystring
   */
  constructor(field = 'debug') {
    const qo = qs.parse()
    const hasField = qo[field] !== undefined
    if (hasField) {
      import('vconsole').then(({ default: VConsole }) => {
        new VConsole()
      })
    }
  }
}

export default Console
