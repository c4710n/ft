import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import app from '../app';
import classname from '../util/classname';
/**
 * A timer via
 *
 * @example
 * const timer = new Timer(500, callback)
 *
 * // start timer
 * timer.start()
 *
 * // stop timer
 * timer.stop()
 *
 * // reset timer
 * timer.reset()
 *
 */

var Timer = /*#__PURE__*/function () {
  /**
   * @param {number} timeout timeout in milliseconds.
   */
  function Timer(timeout, callback) {
    _classCallCheck(this, Timer);

    if (typeof timeout !== 'number') {
      throw new Error("[".concat(classname(this), "] timeout is required"));
    }

    this.timeout = timeout;
    this.callback = callback;
    this.ticker = app.ticker;
    this.isTickerStopped = true;
    this.startTime = 0;
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      this.startTime = performance.now();
      this.startTick();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stopTick();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.isTickerStopped) {
        this.start();
      } else {
        this.startTime = performance.now();
      }
    }
  }, {
    key: "check",
    value: function check() {
      if (this.duration > this.timeout) {
        this.stopTick();

        if (this.callback) {
          this.callback();
        }
      }
    }
  }, {
    key: "duration",
    get: function get() {
      var now = performance.now();
      return now - this.startTime;
    }
  }, {
    key: "startTick",
    value: function startTick() {
      this.isTickerStopped = false;
      this.ticker.add(this.check, this);
    }
  }, {
    key: "stopTick",
    value: function stopTick() {
      this.isTickerStopped = true;
      this.ticker.remove(this.check, this);
    }
  }]);

  return Timer;
}();

function timeout(time, callback) {
  return new Timer(time, callback);
}

export default timeout;
//# sourceMappingURL=timeout.js.map