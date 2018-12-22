import PIXI from '#/pixi'
import { splice } from '#/utils/fast'

const { DisplayObject } = PIXI

class $DisplayObject extends DisplayObject {}

function initComponents() {
  if (!this.components) {
    this.components = []
  }
}

function addComponent(component) {
  this.initComponents()

  this.components.push(component)

  if (component.added === true) return
  component.added === true
  component.onAdded(this)
}

function removeComponent(component) {
  this.initComponents()

  const index = this.components.indexOf(component)
  if (index !== -1) {
    splice(this.components, index, 1)
  }

  if (component.added === false) return
  component.added === false
  component.onRemoved(this)
}

function apply() {
  $DisplayObject.prototype.initComponents = initComponents
  $DisplayObject.prototype.addComponent = addComponent
  $DisplayObject.prototype.removeComponent = removeComponent
}

export default {
  apply,
}
