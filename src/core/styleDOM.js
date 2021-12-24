function styleDOM(dom, { disableScroll = true, bgColor = '#ffffff' } = {}) {
  dom.style.userSelect = 'none'
  dom.style.touchAction = 'none'
  dom.style.cursor = 'auto'
  dom.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)'
  dom.style.backgroundColor = bgColor

  if (disableScroll) {
    document.body.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )

    document.body.addEventListener(
      'scroll',
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  return dom
}

export default styleDOM
