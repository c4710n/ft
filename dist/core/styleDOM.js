function styleDOM(dom) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$disableScroll = _ref.disableScroll,
      disableScroll = _ref$disableScroll === void 0 ? true : _ref$disableScroll,
      _ref$bgColor = _ref.bgColor,
      bgColor = _ref$bgColor === void 0 ? '#ffffff' : _ref$bgColor;

  dom.style.userSelect = 'none';
  dom.style.touchAction = 'none';
  dom.style.cursor = 'auto';
  dom.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)';
  dom.style.backgroundColor = bgColor;

  if (disableScroll) {
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, {
      passive: false
    });
    document.body.addEventListener('scroll', function (e) {
      e.preventDefault();
    }, {
      passive: false
    });
  }

  return dom;
}

export default styleDOM;
//# sourceMappingURL=styleDOM.js.map