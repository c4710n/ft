class Container {
  constructor(selector, { disableScroll = true, bgColor = '#ffffff' } = {}) {
    this.dom = document.querySelector(selector)
    if (!this.dom) {
      throw new Error(`[FT] invalid selector of container`)
    }

    this.dom.style.userSelect = 'none'
    this.dom.style.touchAction = 'none'
    this.dom.style.cursor = 'auto'
    this.dom.style.WebkitTapHighlightColor = 'rgba(0, 0, 0, 0)'
    this.bgColor = bgColor

    if (disableScroll) {
      this.disableScroll()
    }
  }

  disableScroll() {
    document.body.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )

    document.body.addEventListener(
      'scroll',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  set bgColor(color) {
    this.dom.style.backgroundColor = color
  }
}

export default Container
