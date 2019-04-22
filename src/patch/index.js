import PIXI from '#/pixi'
import { FT } from '#/core'
import { splice } from '#/utils/fast'

import patchDisplayObjectMethods from './patchDisplayObjectMethods'

// const addChild = PIXI.Container.prototype.addChild
// const removeChild = PIXI.Container.prototype.removeChild

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

  return this
}

function removeComponent(component) {
  this.initComponents()

  const index = this.components.indexOf(component)
  const exist = index !== -1
  if (!exist) {
    return this
  }

  splice(this.components, index, 1)
  _unbindComponent(this, component)

  return this
}

function patchDisplayObject() {
  const { DisplayObject } = PIXI
  DisplayObject.prototype.initComponents = initComponents
  DisplayObject.prototype.addComponent = addComponent
  DisplayObject.prototype.removeComponent = removeComponent
  DisplayObject.prototype._onAdded = _onAdded
  DisplayObject.prototype._onRemoved = _onRemoved
}

function createDisplayObject(Class, ...args) {
  const displayObject = new Class(...args)
  displayObject.on('added', displayObject._onAdded, displayObject)
  displayObject.on('removed', displayObject._onRemoved, displayObject)

  patchDisplayObjectMethods(displayObject)

  return displayObject
}

// patch it, now!
patchDisplayObject()

export default {
  createDisplayObject,
}
