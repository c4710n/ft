import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.concat.js";
export function randomFloat(_ref) {
  var _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      max = _ref.max,
      _ref$includeMax = _ref.includeMax,
      includeMax = _ref$includeMax === void 0 ? false : _ref$includeMax;

  if (min === 0) {
    if (includeMax) {
      // [0, max]
      var r = Math.random() * (max + 1);
      return r > max ? max : r;
    } else {
      // [0, max)
      return Math.random() * max;
    }
  } else {
    if (includeMax) {
      // [min, max]
      var _r = Math.random() * (max - min + 1) + min;

      return _r > max ? max : _r;
    } else {
      // [min, max)
      return Math.random() * (max - min) + min;
    }
  }
}
export function randomInteger(_ref2) {
  var _ref2$min = _ref2.min,
      min = _ref2$min === void 0 ? 0 : _ref2$min,
      max = _ref2.max,
      _ref2$includeMax = _ref2.includeMax,
      includeMax = _ref2$includeMax === void 0 ? false : _ref2$includeMax;

  if (min === 0) {
    if (includeMax) {
      // [0, max]
      return Math.floor(Math.random() * (max + 1));
    } else {
      // [0, max)
      return Math.floor(Math.random() * max);
    }
  } else {
    if (includeMax) {
      // [min, max]
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      // [min, max)
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
}

function random(_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      _ref3$float = _ref3["float"],
      _float = _ref3$float === void 0 ? false : _ref3$float,
      _ref3$includeMax = _ref3.includeMax,
      includeMax = _ref3$includeMax === void 0 ? false : _ref3$includeMax;

  if (_float) {
    return randomFloat({
      min: min,
      max: max,
      includeMax: includeMax
    });
  } else {
    return randomInteger({
      min: min,
      max: max,
      includeMax: includeMax
    });
  }
}

export function getRandomElements(array, num) {
  var total = array.length;
  var n = num > total ? total : num;
  var shuffledArray = array.sort(function () {
    return 0.5 - Math.random();
  });
  var selected = shuffledArray.slice(0, n);
  return selected;
}
export function getRandomSeparatedElements(array, num) {
  var total = array.length;
  var n = num > total ? total : num;
  var shuffledArray = array.slice().sort(function () {
    return 0.5 - Math.random();
  });
  var selected = shuffledArray.slice(0, n);
  var rest = shuffledArray.slice(n, total);
  return [selected, rest];
}
export function getSequentialRandomSeparatedElements(array, num) {
  var total = array.length;
  var n = num > total ? total : num;
  var maxSliceEnd = total - n;
  var sliceEnd = randomInteger(maxSliceEnd);
  var selected = array.slice(sliceEnd, sliceEnd + n);
  var begin = array.slice(0, sliceEnd);
  var end = array.slice(sliceEnd + n);
  var rest = [].concat(begin, end);
  return [selected, rest];
}
export function getRandomElement(array) {
  var maxIndex = array.length - 1;
  var randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  var randomOne = array[randomIndex];
  return randomOne;
}
export default random;
//# sourceMappingURL=random.js.map