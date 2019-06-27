import { Tween, Easing } from '../systems/TweenSystem/TWEEN'
import { PIXI } from '../core'

const { WHITE } = PIXI.Texture

/**
 * A general scroller.
 *
 * @example
 * const content = new DisplayObject()
 * const scroller = FT.create(Scroller, content, {
 *   width: 640,
 *   height: 320,
 *   enableX: false,
 *   enableY: true,
 * })
 *
 * scroller.position.set(pos)
 *
 * container.addChild(scroller)
 */

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
  constructor(
    content,
    {
      width = 750,
      height = 1500,
      enableX = false,
      enableY = true,
      resistance = 20,
      overflow = 50,
      bgColor,
    } = {}
  ) {
    super()

    this.viewWidth = width
    this.viewHeight = height

    const contentWidth = content.width
    const contentHeight = content.height

    this.cachedPosition = { x: 0, y: 0 }

    const mask = new PIXI.Graphics()
    mask.beginFill(0xffff00)
    mask.drawRect(0, 0, width, height)
    mask.endFill()
    this.addChild(mask)

    const window = new PIXI.Container()
    window.mask = mask
    this.addChild(window)

    const bg = new PIXI.Sprite(WHITE)
    bg.width = width
    bg.height = height

    if (bgColor !== undefined) {
      bg.tint = bgColor
    } else {
      bg.alpha = 0
    }

    window.addChild(bg)

    window.addChild(content)
    this.content = content

    window.interactive = true
    window.on('pointerdown', this.onPointerDown)
    window.on('pointermove', this.onPointerMove)
    window.on('pointerup', this.onPointerUp)
    window.on('pointerupoutside', this.onPointerUp)

    // scroll
    this.enableX = enableX
    this.enableY = enableY
    this.resistance = resistance

    // position
    this.maxX = 0
    this.minX = width - contentWidth
    if (this.minX > 0) this.minX = 0

    this.maxY = 0
    this.minY = height - contentHeight
    if (this.minY > 0) this.minY = 0

    // bounce related
    this.bounceX = null
    this.bounceY = null
    this.maxOverflowX = overflow
    this.minOverflowX = this.minX - overflow
    this.maxOverflowY = overflow
    this.minOverflowY = this.minY - overflow

    // momentum related
    this.momentumX = null
    this.momentumY = null
    this.resetScrollVelocity()
  }

  /**
   * @access private
   */
  onPointerDown = event => {
    this.isScrolling = true
    this.stopTween()

    this.data = event.data
    this.pointerDownPosition = this.data.getLocalPosition(this.content)
    this.previousPosition = this.pointerDownPosition
    this.previousTimestamp = event.data.originalEvent.timeStamp
  }

  /**
   * @access private
   */
  onPointerMove = event => {
    if (!this.isScrolling) return

    const currentPosition = this.data.getLocalPosition(this)
    const currentTimestamp = event.data.originalEvent.timeStamp
    const time = currentTimestamp - this.previousTimestamp
    const factor = 10

    if (this.enableX) {
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

    if (this.enableY) {
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

    this.previousPosition = currentPosition
    this.previousTimestamp = currentTimestamp
  }

  /**
   * @access private
   */
  onPointerUp = () => {
    this.isScrolling = false
    this.data = null

    if (this.enableX) this.handleMovementX()
    if (this.enableY) this.handleMovementY()
    this.resetScrollVelocity()
  }

  /**
   * @access private
   */
  stopTween = () => {
    if (this.bounceX) this.bounceX.halt()
    if (this.bounceY) this.bounceY.halt()
    if (this.momentumX) this.momentumX.halt()
    if (this.momentumY) this.momentumY.halt()
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

      momentum.on('update', ({ velocity }) => {
        cacheX += velocity

        if (cacheX <= this.maxOverflowX && cacheX >= this.minOverflowX) {
          if (!this.content.added) return
          this.content.x = cacheX
        } else {
          momentum.halt()
          this.handleBounce()
        }
      })

      momentum.on('complete', this.handleBounce)
      this.momentumX = momentum
    } else {
      this.handleBounceX()
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

      momentum.on('update', ({ velocity }) => {
        cacheY += velocity

        if (cacheY <= this.maxOverflowY && cacheY >= this.minOverflowY) {
          if (!this.content.added) return
          this.content.y = cacheY
        } else {
          momentum.halt()
          this.handleBounceY()
        }
      })

      momentum.on('complete', this.handleBounceY)
      this.momentumY = momentum
    } else {
      this.handleBounceY()
    }
  }

  handleBounceX = () => {
    const { x } = this.content

    if (x > this.maxX || x < this.minX) {
      const from = { x }
      const to = {}

      if (x > this.maxX) {
        to.x = this.maxX
      } else if (x < this.minX) {
        to.x = this.minX
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(1000)
        .easing(Easing.Quartic.Out)
        .start()
      bounce.on('update', ({ x }) => {
        if (!this.content.added) return
        this.content.x = x
      })

      this.bounceX = bounce
    }
  }

  handleBounceY = () => {
    const { y } = this.content

    if (y > this.maxY || y < this.minY) {
      const from = { y }
      const to = {}

      if (y > this.maxY) {
        to.y = this.maxY
      } else if (y < this.minY) {
        to.y = this.minY
      }

      const bounce = new Tween(from)
        .to(to)
        .duration(1000)
        .easing(Easing.Quartic.Out)
        .start()
      bounce.on('update', ({ y }) => {
        if (!this.content.added) return
        this.content.y = y
      })

      this.bounceY = bounce
    }
  }

  onUpdate() {
    const { x: currentX, y: currentY } = this.content
    const { x: cachedX, y: cachedY } = this.cachedPosition

    if (currentX === cachedX && currentY === cachedY) {
      return
    }
    this.cachedPosition.x = currentX
    this.cachedPosition.y = currentY

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
      } else {
        child.renderable = true
      }
    }
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
