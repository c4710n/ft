import PIXI from '#/pixi'
import { splice } from '#/utils/fast'

function _bindComponent(displayObject, component) {
  if (displayObject.added && component.added === false) {
    component.added = true
    component.onAdded(displayObject)
  }
}

function _unbindComponent(displayObject, component) {
  if (!displayObject.added && component.added === true) {
    component.added = false
    component.onRemoved(displayObject)
  }
}

function onAdded() {
  this.added = true

  if (this.components) {
    this.components.forEach(component => {
      _bindComponent(this, component)
    })
  }
}

function onRemoved() {
  this.added = false

  if (this.components) {
    this.components.forEach(component => {
      _unbindComponent(this, component)
    })
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
  DisplayObject.prototype.onAdded = onAdded
  DisplayObject.prototype.onRemoved = onRemoved
}

function createDisplayObject(Class, ...args) {
  const instance = new Class(...args)
  instance.on('added', instance.onAdded, instance)
  instance.on('removed', instance.onRemoved, instance)
  return instance
}

export default {
  patchDisplayObject,
  createDisplayObject,
}
