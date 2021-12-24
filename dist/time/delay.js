import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import app from '../app';
/**
 * A delay timer based on FT.ticker.
 *
 * @param {number} ms specified time in milliseconds.
 * @return {Promise} a promise will be resolved when timeout.
 */

function delay(ms) {
  return new Promise(function (resolve) {
    var start = performance.now();

    var timer = function timer() {
      var now = performance.now();

      if (now - start > ms) {
        resolve();
        app.ticker.remove(timer);
      }
    };

    app.ticker.add(timer);
  });
}

export default delay;
//# sourceMappingURL=delay.js.map