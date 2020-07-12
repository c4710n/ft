/**
 * This function can be used to trigger autoplay in WeChat.
 * + autoplay audio in WeChat on iOS and Android.
 * + autoplay video in Wechat on iOS.
 *
 * @param {function} cb callback function to exec.
 */
function untouchExec(cb) {
  if (
    typeof window.WeixinJSBridge === 'object' &&
    typeof window.WeixinJSBridge.invoke === 'function'
  ) {
    window.WeixinJSBridge.invoke('getNetworkType', {}, cb)
  } else {
    document.addEventListener('WeixinJSBridgeReady', cb, false)
  }
}

export default {
  untouchExec,
}
