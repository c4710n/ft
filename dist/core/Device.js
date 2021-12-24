import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.constructor.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import PIXI from './PIXI';
/**
 * Get metadata of device.
 */

var Device = /*#__PURE__*/function () {
  function Device() {
    _classCallCheck(this, Device);
  }

  _createClass(Device, null, [{
    key: "DPR",
    get:
    /**
     * DPR of current device.
     */
    function get() {
      return window.devicePixelRatio || 1;
    }
    /**
     * Size in CSS pixel of current device.
     */

  }, {
    key: "cssSize",
    get: function get() {
      var width = document.documentElement.clientWidth;
      var height = document.documentElement.clientHeight;
      return new PIXI.Rectangle(0, 0, width, height);
    }
    /**
     * Size in physical pixel of current device.
     */

  }, {
    key: "size",
    get: function get() {
      var _this$cssSize = this.cssSize,
          cssWidth = _this$cssSize.width,
          cssHeight = _this$cssSize.height;
      var width = cssWidth * Device.DPR;
      var height = cssHeight * Device.DPR;
      return new PIXI.Rectangle(0, 0, width, height);
    }
    /**
     * User agent.
     */

  }, {
    key: "UA",
    get: function get() {
      var ua = window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : '';
      return ua;
    }
  }, {
    key: "isIOS",
    get: function get() {
      var pattern = /ip[honead]{2,4}/i;
      return pattern.test(Device.UA);
    }
  }, {
    key: "isAndroid",
    get: function get() {
      var pattern = /android/i;
      return pattern.test(Device.UA);
    }
  }, {
    key: "isWeChat",
    get: function get() {
      var pattern = /MicroMessenger/i;
      return pattern.test(Device.UA);
    }
  }, {
    key: "isQQ",
    get: function get() {
      var pattern_ios = new RegExp('(iPad|iPhone|iPod).*? (IPad)?QQ\\/([\\d\\.]+)');
      var pattern_android = new RegExp('\\bV1_AND_SQI?_([\\d\\.]+)(.*? QQ\\/([\\d\\.]+))?', 'ig');
      return pattern_ios.test(Device.UA) || pattern_android.test(Device.UA);
    }
  }, {
    key: "isQQBrowser",
    get: function get() {
      var pattern = /m?(qqbrowser)[\/\s]?([\w\.]+)/i; // eslint-disable-line

      return pattern.test(Device.UA);
    }
  }]);

  return Device;
}();

export default Device;
//# sourceMappingURL=Device.js.map