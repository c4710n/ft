import PIXI from '#/pixi'
import { FT } from '#/core'
import { splice } from '#/utils/fast'

function _bindComponent(displayObject, component) {
  if (displayObject.added && component.added === false) {
    component.added = true
    component.onAdded(displayObject)

    if (component.onUpdate) {
      FT.ticker.add(component.onUpdate, component)
    }
  }
}

function _unbindComponent(displayObject, component) {
  // no need to check displayed.added when removing component
  if (component.added === true) {
    component.added = false
    component.onRemoved(displayObject)

    if (component.onUpdate) {
      FT.ticker.remove(component.onUpdate, component)
    }
  }
}

function _onAdded() {
  this.added = true

  if (this.components) {
    this.components.forEach(component => {
      _bindComponent(this, component)
    })
  }

  if (this.onAdded) {
    this.onAdded()
  }

  if (this.onUpdate) {
    FT.ticker.add(this.onUpdate, this)
  }
}

function _onRemoved() {
  this.added = false

  if (this.components) {
    this.components.forEach(component => {
      _unbindComponent(this, component)
    })
  }

  if (this.onRemoved) {
    this.onRemoved()
  }

  if (this.onUpdate) {
    FT.ticker.remove(this.onUpdate, this)
  }
}

function initComponents() {
  if (!this.components) {
    this.components = []
  }
}

function addComponent(component) {
  this.initComponents()

  this.components.push(component)
  _bindComponent(this, component)
}

function removeComponent(component) {
  this.initComponents()

  const index = this.components.indexOf(component)
  const exist = index !== -1
  if (!exist) return

  splice(this.components, index, 1)
  _unbindComponent(this, component)
}

function patchDisplayObject() {
  const { DisplayObject } = PIXI
  DisplayObject.prototype.initComponents = initComponents
  DisplayObject.prototype.addComponent = addComponent
  DisplayObject.prototype.removeComponent = removeComponent
  DisplayObject.prototype._onAdded = _onAdded
  DisplayObject.prototype._onRemoved = _onRemoved
}

function setOrigin(originX, originY) {
  if (originX !== undefined) this.anchor.x = originX
  if (originY !== undefined) this.anchor.y = originY

  if (originY === undefined) {
    this.anchor.x = this.anchor.y = originX
  }

  return this
}

function setSize(width, height) {
  if (width !== undefined) this.width = width
  if (height !== undefined) this.height = height

  return this
}

function setPosition(x, y) {
  if (x !== undefined) this.x = x
  if (y !== undefined) this.y = y

  return this
}

function setAlpha(alpha) {
  this.alpha = alpha

  return this
}

function setScale(scaleX, scaleY) {
  if (scaleX !== undefined) this.scale.x = scaleX
  if (scaleY !== undefined) this.scale.y = scaleY

  if (scaleY === undefined) {
    this.scale.set(scaleX)
  }

  return this
}

function setInteractive(enabled = true) {
  this.interactive = enabled

  return this
}

function createDisplayObject(Class, ...args) {
  const instance = new Class(...args)
  instance.on('added', instance._onAdded, instance)
  instance.on('removed', instance._onRemoved, instance)

  instance.setOrigin = setOrigin
  instance.setSize = setSize
  instance.setPosition = setPosition
  instance.setAlpha = setAlpha
  instance.setScale = setScale
  instance.setInteractive = setInteractive

  return instance
}

// patch it, now!
patchDisplayObject()

export default {
  createDisplayObject,
}
