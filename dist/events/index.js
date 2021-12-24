import "core-js/modules/es.array.concat.js";
import EventEmitter from 'eventemitter3';
import Device from '../core/Device';
var EE = new EventEmitter();
var EVENT_RESIZE = 'resize';

function emitResizeEvent() {
  var _Device$cssSize$clone = Device.cssSize.clone(),
      width = _Device$cssSize$clone.width,
      height = _Device$cssSize$clone.height;

  EE.emit(EVENT_RESIZE, {
    width: width,
    height: height
  });
}

var resize = {};

resize.on = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  EE.on.apply(EE, [EVENT_RESIZE].concat(args));
};

resize.off = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  EE.off.apply(EE, [EVENT_RESIZE].concat(args));
};

resize.emit = emitResizeEvent;
var EVENT_SCALE = 'scale';
var scale = {};

scale.on = function () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  EE.on.apply(EE, [EVENT_SCALE].concat(args));
};

scale.off = function () {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  EE.off.apply(EE, [EVENT_SCALE].concat(args));
};

scale.emit = function () {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  EE.emit.apply(EE, [EVENT_SCALE].concat(args));
};

var EVENT_SHOW = 'show';
var show = {};

show.on = function () {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  EE.on.apply(EE, [EVENT_SHOW].concat(args));
};

show.off = function () {
  for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  EE.off.apply(EE, [EVENT_SHOW].concat(args));
};

show.emit = function () {
  for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  EE.emit.apply(EE, [EVENT_SHOW].concat(args));
};

var EVENT_HIDE = 'hide';
var hide = {};

hide.on = function () {
  for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  EE.on.apply(EE, [EVENT_HIDE].concat(args));
};

hide.off = function () {
  for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  EE.off.apply(EE, [EVENT_HIDE].concat(args));
};

hide.emit = function () {
  for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    args[_key11] = arguments[_key11];
  }

  EE.emit.apply(EE, [EVENT_HIDE].concat(args));
};

export default {
  resize: resize,
  scale: scale,
  show: show,
  hide: hide
};
//# sourceMappingURL=index.js.map