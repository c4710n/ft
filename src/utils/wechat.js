/**
 * This function can be used to trigger autoplay:
 * + audio in WeChat on iOS and Android.
 * + video in Wechat on iOS.
 */
export function untouchExec(cb) {
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
