import "core-js/modules/es.string.repeat.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import TWEEN, { Tween as $Tween, Easing as $Easing } from '@tweenjs/tween.js'; // candy for loop

if (!$Tween.prototype.loop) {
  $Tween.prototype.loop = function loop() {
    this.repeat(Number.POSITIVE_INFINITY);
    return this;
  };
} // Promisify start()


if (!$Tween.prototype.startAsync) {
  $Tween.prototype.startAsync = function () {
    var _this = this;

    return new Promise(function (resolve) {
      _this.onComplete(resolve);

      _this.start();
    });
  };
}

export var Tween = $Tween;
export var Easing = $Easing;
export default TWEEN;
//# sourceMappingURL=TWEEN.js.map