import { utils } from 'pixi.js'
import { splice } from '#/utils/fast'

const { uid } = utils

function addProperties(instance) {
  instance.id = uid()
  instance.systems = []
  instance.systemsDirty = false
  instance.components = {}
  instance.ecs = null
}

function addMethods(prototype) {
  prototype.addToECS = function addToECS(ecs) {
    this.ecs = ecs
    this.setSystemsDirty()
  }

  prototype.setSystemsDirty = function setSystemsDirty() {
    if (!this.systemsDirty && this.ecs) {
      this.systemsDirty = true
      this.ecs.entitiesSystemsDirty.push(this)
    }
  }

  prototype.addSystem = function addSystem(system) {
    this.systems.push(system)
  }

  prototype.removeSystem = function removeSystem(system) {
    const index = this.systems.indexOf(system)

    if (index !== -1) {
      splice(this.systems, index, 1)
    }
  }

  prototype.addComponent = function addComponent(component) {
    this.components[component.name] = component
    this.setSystemsDirty()
  }

  prototype.removeComponent = function removeComponent(name) {
    if (!this.components[name]) {
      return
    }

    this.components[name] = undefined
    this.setSystemsDirty()
  }

  prototype.updateComponent = function updateComponent(name, data) {
    const component = this.components[name]

    if (component) {
      const keys = Object.keys(data)

      for (const key of keys) {
        component[key] = data[key]
      }
    }
  }

  prototype.updateComponents = function updateComponents(componentsData) {
    const components = Object.keys(componentsData)

    for (const component of components) {
      this.updateComponent(component, componentsData[component])
    }
  }

  prototype.dispose = function dispose() {
    for (const system of this.systems) {
      system.removeEntity(this)
    }
  }
}

export default {
  addProperties,
  addMethods,
}
