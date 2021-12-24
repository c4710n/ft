import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * This function can be used to trigger autoplay in WeChat.
 * + autoplay audio in WeChat on iOS and Android.
 * + autoplay video in Wechat on iOS.
 *
 * @param {function} cb callback function to exec.
 */
function untouchExec(cb) {
  if (_typeof(window.WeixinJSBridge) === 'object' && typeof window.WeixinJSBridge.invoke === 'function') {
    window.WeixinJSBridge.invoke('getNetworkType', {}, cb);
  } else {
    document.addEventListener('WeixinJSBridgeReady', cb, false);
  }
}

export default {
  untouchExec: untouchExec
};
//# sourceMappingURL=wechat.js.map