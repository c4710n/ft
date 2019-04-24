import PIXI from '../pixi'
import { FT } from '../core'
import { splice } from '../utils/fast'

const DEBUG = false
const { Container, DisplayObject } = PIXI

Container.prototype.$addChild = Container.prototype.addChild
Container.prototype.$removeChild = Container.prototype.removeChild

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

function callPostAdd(container) {
  container.added = true

  if (container.components) {
    container.components.forEach(component => {
      _bindComponent(container, component)
    })
  }

  if (container.onAdded) container.onAdded()
  if (container.postAdd) container.postAdd()

  if (container.onUpdate) {
    FT.ticker.add(container.onUpdate, container)
  }
}

function callPostRemove(container) {
  container.added = false

  if (container.components) {
    container.components.forEach(component => {
      _unbindComponent(container, component)
    })
  }

  if (container.onRemoved) container.onRemoved()
  if (container.postRemove) container.postRemove()

  if (container.onUpdate) {
    FT.ticker.remove(container.onUpdate, container)
  }
}

function recursiveCallPostAdd(container) {
  callPostAdd(container)

  if (DEBUG) {
    console.log('[lifecycle] add', container.constructor.name) // eslint-disable-line
  }

  container.children.forEach(c => {
    recursiveCallPostAdd(c)
  })
}

function recursiveCallPostRemove(container) {
  container.children.forEach(c => {
    recursiveCallPostRemove(c)
  })

  callPostRemove(container)

  if (DEBUG) {
    console.log('[lifecycle] remove', container.constructor.name) // eslint-disable-line
  }
}

function _addChild(child) {
  this.$addChild(child)

  if (this.added) {
    recursiveCallPostAdd(child)
  }
}

function _removeChild(child) {
  this.$removeChild(child)

  if (this.added) {
    recursiveCallPostRemove(child)
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

export default function patchDisplayObjectLifecycle() {
  DisplayObject.prototype.initComponents = initComponents
  DisplayObject.prototype.addComponent = addComponent
  DisplayObject.prototype.removeComponent = removeComponent

  Container.prototype.addChild = _addChild
  Container.prototype.removeChild = _removeChild
}