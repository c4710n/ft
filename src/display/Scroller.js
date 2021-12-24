import { PIXI } from '../core'
import { Tween, Easing } from '../animation'
import { clamp } from '../util/math'

const { Sprite } = PIXI
const { WHITE } = PIXI.Texture

class Scroller extends PIXI.Container {
  /**
   * @param {DisplayObject} content the content will be scrolled
   * @param {Object} options
   * @param {number} [options.width=750] the width of scroller
   * @param {number} [options.height=1500] the height of scroller
   * @param {boolean} [options.enableX=false] enable scrolling in X direction
   * @param {boolean} [options.enableY=true] enable scrolling in Y direction
   * @param {number} [options.resistance=20] the resistance of scrolling, valid value: 0 - 99
   * @param {number} [options.overflow=100] overflow distance of bounce
   * @param {number} [options.bgColor=0xffffff] background color
   */
  constructor(content, options) {
    super()

    const view = new PIXI.Container()

    /* bg */
    const bg = new Sprite(WHITE).setAlpha(0)
    this.bg = bg
    view.addChild(bg)

    /* mask */
    const mask = new PIXI.Graphics()
    this.addChild(mask)
    this.$mask = mask
    view.mask = mask

    /* content */
    // help to calculate the right size of content
    const basePoint = new Sprite(PIXI.Texture.WHITE)
      .setAlpha(0)
      .setSize(1, 1)
      .setPosition(0, 0)
    content.addChild(basePoint)
    this.content = content
    view.addChild(content)

    // undefined value ensures that the first call of setup functions will not be skipped
    this.cachedValues = {
      x: undefined,
      y: undefined,
      viewWidth: undefined,
      viewHeight: undefined,
      contentWidth: undefined,
      contentHeight: undefined,
    }

    /* setup */
    this.setup(options)

    view
      .setInteractive(true)
      .on('pointerdown', this.onPointerDown)
      .on('pointermove', this.onPointerMove)
      .on('pointerup', this.onPointerUp)
      .on('pointerupoutside', this.onPointerUp)

    this.addChild(view)
  }

  /**
   * @access private
   */
  onPointerDown = (event) => {
    this.stopTween()
    this.isScrolling = true

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this.content)
    this.pointerDownPosition.x *= this.content.scale.x
    this.pointerDownPosition.y *= this.content.scale.y

    this.previousPosition = this.pointerDownPosition
    this.previousTimestamp = event.data.originalEvent.timeStamp
  }

  emitProgress() {
    const { x, y } = this.content
    const { minX, minY } = this

    const progressX = minX === 0 ? 0 : x / minX
    const progressY = minY === 0 ? 0 : y / minY

    this.emit('progress', { x: progressX, y: progressY })
  }

  setProgress(x, y) {
    const { minX, minY } = this

    this.content.x = minX * clamp(x, 0, 1)
    this.content.y = minY * clamp(y, 0, 1)
  }

  /**
   * @access private
   */
  onPointerMove = (event) => {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
    const currentTimestamp = event.data.originalEvent.timeStamp
    const time = currentTimestamp - this.previousTimestamp
    const factor = 10

    if (this.isEnabledX()) {
      const shiftX = currentPosition.x - this.previousPosition.x
      this.scrollVelocityX = (shiftX / time) * factor

      let x = currentPosition.x - this.pointerDownPosition.x
      if (x > this.maxOverflowX) {
        x = this.maxOverflowX
      } else if (x < this.minOverflowX) {
        x = this.minOverflowX
      }

      if (!this.content.added) return
      this.content.x = x
    }

    if (this.isEnabledY()) {
      const shiftY = currentPosition.y - this.previousPosition.y
      this.scrollVelocityY = (shiftY / time) * factor

      let y = currentPosition.y - this.pointerDownPosition.y
      if (y > this.maxOverflowY) {
        y = this.maxOverflowY
      } else if (y < this.minOverflowY) {
        y = this.minOverflowY
      }

      if (!this.content.added) return
      this.content.y = y
    }

    this.emitProgress()
    this.previousPosition = currentPosition
    this.previousTimestamp = currentTimestamp
  }

  /**
   * @access private
   */
  onPointerUp = () => {
    this.isScrolling = false
    this.data = null

    if (this.isEnabledX()) this.handleMovementX()
    if (this.isEnabledY()) this.handleMovementY()
    this.resetScrollVelocity()
  }

  /**
   * @access private
   */
  stopTween = () => {
    if (this.bounceX) this.bounceX.stop()
    if (this.bounceY) this.bounceY.stop()
    if (this.momentumX) this.momentumX.stop()
    if (this.momentumY) this.momentumY.stop()
  }

  /**
   * @access private
   */
  resetScrollVelocity() {
    this.previousPosition = null
    this.previousTimestamp = 0
    this.scrollVelocityX = 0
    this.scrollVelocityY = 0
  }

  handleMovementX = () => {
    const absScrollVelocityX = Math.abs(this.scrollVelocityX)
    if (absScrollVelocityX >= 3) {
      const from = {}
      const to = {}

      from.velocity = this.scrollVelocityX
      to.velocity = 0

      let { x: cacheX } = this.content
      const duration = (100 - this.resistance) * absScrollVelocityX

      const momentum = new Tween(from)
        .to(to)
        .duration(duration)
        .easing(Easing.Quintic.Out)
        .start()

      momentum.onUpdate(({ velocity }) => {
        cacheX += velocity

        if (cacheX <= this.maxOverflowX && cacheX >= this.minOverflowX) {
          if (!this.content.added) return
          this.content.x = cacheX
          this.emitProgress()
        } else {
          momentum.stop()
          this.handleBounceX({ fromMomentum: true })
        }
      })

      momentum.onComplete(() => this.handleBounceX({ fromMomentum: true }))
      this.momentumX = momentum
    } else {
      this.handleBounceX({ fromMomentum: false })
    }
  }

  handleMovementY = () => {
    const absScrollVelocityY = Math.abs(this.scrollVelocityY)
    if (absScrollVelocityY >= 3) {
      const from = {}
      const to = {}

      from.velocity = this.scrollVelocityY
      to.velocity = 0

      let { y: cacheY } = this.content
      const duration = (100 - this.resistance) * absScrollVelocityY
      this.resetScrollVelocity()

      const momentum = new Tween(from)
        .to(to)
        .duration(duration)
        .easing(Easing.Quintic.Out)
        .start()

      momentum.onUpdate(({ velocity }) => {
        cacheY += velocity

        if (cacheY <= this.maxOverflowY && cacheY >= this.minOverflowY) {
          if (!this.content.added) return
          this.content.y = cacheY
          this.emitProgress()
        } else {
          momentum.stop()
          this.handleBounceY({ fromMomentum: true })
        }
      })

      momentum.onComplete(() => this.handleBounceY({ fromMomentum: true }))
      this.momentumY = momentum
    } else {
      this.handleBounceY({ fromMomentum: false })
    }
  }

  handleBounceX = ({ fromMomentum = false } = {}) => {
    const { x } = this.content

    if (x > this.maxX || x < this.minX) {
      const from = { x }
      const to = {}

      if (x > this.maxX) {
        to.x = this.maxX
        this.emit('bounce', { type: 'right', fromMomentum })
      } else if (x < this.minX) {
        to.x = this.minX
        this.emit('bounce', { type: 'left', fromMomentum })
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(1000)
        .easing(Easing.Quartic.Out)
        .start()

      bounce.onUpdate(({ x }) => {
        if (!this.content.added) return
        this.content.x = x
        this.emitProgress()
      })

      this.bounceX = bounce
    }
  }

  handleBounceY = ({ fromMomentum = false } = {}) => {
    const { y } = this.content

    if (y > this.maxY || y < this.minY) {
      const from = { y }
      const to = {}

      if (y > this.maxY) {
        to.y = this.maxY
        this.emit('bounce', { type: 'top', fromMomentum })
      } else if (y < this.minY) {
        to.y = this.minY
        this.emit('bounce', { type: 'bottom', fromMomentum })
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(1000)
        .easing(Easing.Quartic.Out)
        .start()

      bounce.onUpdate(({ y }) => {
        if (!this.content.added) return
        this.content.y = y
        this.emitProgress()
      })

      this.bounceY = bounce
    }
  }

  onUpdate() {
    this.setupBounds()
    this.lazyRender()
  }

  setProp(prop, value, defaultValue) {
    if (value === undefined) {
      if (this[prop] === undefined) {
        this[prop] = defaultValue
      }
    } else {
      this[prop] = value
    }
  }

  setup({
    width,
    height,
    overflow,
    resistance,
    enableX,
    enableY,
    enableLazyRender,
  }) {
    this.setProp('viewWidth', width, 750)
    this.setProp('viewHeight', height, 1500)
    this.setProp('overflow', overflow, 50)
    this.setProp('resistance', resistance, 20)
    this.setProp('enableX', enableX, false)
    this.setProp('enableY', enableY, true)

    this.momentumX = null
    this.momentumY = null
    this.resetScrollVelocity()

    this.setProp('enableLazyRender', enableLazyRender, false)

    this.setupBounds()
    this.lazyRender()
  }

  setupBounds() {
    const { width: currentContentWidth, height: currentContentHeight } =
      this.content

    const { viewWidth: currentViewWidth, viewHeight: currentViewHeight } = this

    const {
      contentWidth: cachedContentWidth,
      contentHeight: cachedContentHeight,
      viewWidth: cachedViewWidth,
      viewHeight: cachedViewHeight,
    } = this.cachedValues

    if (
      currentContentWidth === cachedContentWidth &&
      currentContentHeight === cachedContentHeight &&
      currentViewWidth === cachedViewWidth &&
      currentViewHeight === cachedViewHeight
    ) {
      return
    }

    this.stopTween()

    this.cachedValues.viewWidth = currentViewWidth
    this.cachedValues.viewHeight = currentViewHeight
    this.cachedValues.contentWidth = currentContentWidth
    this.cachedValues.contentHeight = currentContentHeight

    // bg
    const { bg } = this
    bg.width = currentViewWidth
    bg.height = currentViewHeight

    // view mask
    const mask = this.$mask
    mask.clear()
    mask.beginFill(0xffff00)
    mask.drawRect(0, 0, currentViewWidth, currentViewHeight)
    mask.endFill()

    // position
    this.maxX = 0
    this.minX = currentViewWidth - currentContentWidth
    if (this.minX > 0) this.minX = 0
    this.maxY = 0
    this.minY = currentViewHeight - currentContentHeight
    if (this.minY > 0) this.minY = 0

    // if the scrolling distance beyonds the min and max value,
    // then reset it to min or max value
    if (this.content.x < this.minX) {
      this.content.x = this.minX
    }

    if (this.content.x > this.maxX) {
      this.content.x = this.maxX
    }

    if (this.content.y < this.minY) {
      this.content.y = this.minY
    }

    if (this.content.y > this.maxY) {
      this.content.y = this.maxY
    }

    // bounce related
    const { overflow } = this
    this.bounceX = null
    this.bounceY = null
    this.maxOverflowX = overflow
    this.minOverflowX = this.minX - overflow
    this.maxOverflowY = overflow
    this.minOverflowY = this.minY - overflow
  }

  lazyRender() {
    if (!this.enableLazyRender) return

    const { x: currentX, y: currentY } = this.content
    const { x: cachedX, y: cachedY } = this.cachedValues

    if (currentX === cachedX && currentY === cachedY) {
      return
    }
    this.cachedValues.x = currentX
    this.cachedValues.y = currentY

    const viewLeft = -this.content.x
    const viewRight = viewLeft + this.viewWidth
    const viewTop = -this.content.y
    const viewBottom = viewTop + this.viewHeight

    for (const child of this.content.children) {
      const { top, bottom, left, right } = getLocalPosition(child)
      const isChildOutOfView =
        top > viewBottom ||
        bottom < viewTop ||
        left > viewRight ||
        right < viewLeft

      if (isChildOutOfView) {
        child.renderable = false
        child.visible = false
      } else {
        child.renderable = true
        child.visible = true
      }
    }
  }

  isEnabledX() {
    const { viewWidth, contentWidth } = this.cachedValues
    return this.enableX && viewWidth < contentWidth
  }

  isEnabledY() {
    const { viewHeight, contentHeight } = this.cachedValues
    return this.enableY && viewHeight < contentHeight
  }
}

function getLocalPosition(displayobject) {
  const { x, y } = displayobject.position
  const { width, height } = displayobject

  const left = x
  const right = x + width
  const top = y
  const bottom = y + height

  return { left, right, top, bottom }
}

export default Scroller
