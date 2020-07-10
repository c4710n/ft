/* global FT_PRODUCTION_MODE */
import app from '../app'
import { PIXI } from '../core'
import events from '../events'
import patchDisplayObjectMethods from './patchDisplayObjectMethods'

const { Container, DisplayObject } = PIXI

patchDisplayObjectMethods(Container.prototype)

Container.prototype.$addChild = Container.prototype.addChild
Container.prototype.$addChildAt = Container.prototype.addChildAt
Container.prototype.$removeChild = Container.prototype.removeChild

function _bindComponent(displayObject, component) {
  if (displayObject.added && component.added === false) {
    component.added = true

    if (!FT_PRODUCTION_MODE) {
      // eslint-disable-next-line
      console.log(
        `[lifecycle] bind component ${component.constructor.name} for ${displayObject.constructor.name}`
      )
    }

    component._onAdded(displayObject)

    if (component.onUpdate) {
      app.ticker.add(component.onUpdate, component)
    }
  }
}

function _unbindComponent(displayObject, component) {
  // no need to check displayObject.added when removing component
  if (component.added === true) {
    component.added = false

    if (component.onUpdate) {
      app.ticker.remove(component.onUpdate, component)
    }

    component._onRemoved(displayObject)

    if (!FT_PRODUCTION_MODE) {
      // eslint-disable-next-line
      console.log(
        `[lifecycle] unbind component ${component.constructor.name} for ${displayObject.constructor.name}`
      )
    }
  }
}

function callPostAdd(container) {
  container.added = true

  if (!FT_PRODUCTION_MODE) {
    console.log('[lifecycle] add', container.constructor.name) // eslint-disable-line
  }

  if (container.onAdded) {
    container.onAdded()
  }

  if (container.components) {
    Object.values(container.components).forEach(component => {
      _bindComponent(container, component)
    })
  }

  if (container.onUpdate) {
    app.ticker.add(container.onUpdate, container)
  }

  if (container.onResize) {
    container._onResize = function _onResize() {
      container.onResize.call(container)
    }
    events.resize.on(container._onResize)
  }
}

function callPostRemove(container) {
  container.added = false

  if (container.onResize) {
    events.resize.off(container._onResize)
  }

  if (container.onUpdate) {
    app.ticker.remove(container.onUpdate, container)
  }

  if (container.components) {
    Object.values(container.components).forEach(component => {
      _unbindComponent(container, component)
    })
  }

  if (container.onRemoved) {
    container.onRemoved()
  }

  if (!FT_PRODUCTION_MODE) {
    console.log('[lifecycle] remove', container.constructor.name) // eslint-disable-line
  }
}

function recursiveCallPostAdd(container) {
  callPostAdd(container)

  container.children.forEach(c => {
    recursiveCallPostAdd(c)
  })
}

function recursiveCallPostRemove(container) {
  container.children.forEach(c => {
    recursiveCallPostRemove(c)
  })

  callPostRemove(container)
}

function _addChild(child) {
  this.$addChild(child)

  if (this.added) {
    recursiveCallPostAdd(child)
  }

  return child
}

function _addChildAt(child, index) {
  this.$addChildAt(child, index)

  if (this.added) {
    recursiveCallPostAdd(child)
  }

  return child
}

function _removeChild(child) {
  this.$removeChild(child)

  if (this.added) {
    recursiveCallPostRemove(child)
  }

  return child
}

function initComponents() {
  if (!this.components) {
    this.components = {}
  }
}

function addComponent(component) {
  this.initComponents()

  const componentName = component.name
  this.components[componentName] = component
  _bindComponent(this, component)

  return this
}

function removeComponent(component) {
  this.initComponents()

  const componentName = component.name
  if (this.components[componentName]) {
    _unbindComponent(this, component)
    delete this.components[componentName]
  }

  return this
}

export default function patchDisplayObjectLifecycle() {
  DisplayObject.prototype.initComponents = initComponents
  DisplayObject.prototype.addComponent = addComponent
  DisplayObject.prototype.removeComponent = removeComponent

  Container.prototype.addChild = _addChild
  Container.prototype.addChildAt = _addChildAt
  Container.prototype.removeChild = _removeChild
}
