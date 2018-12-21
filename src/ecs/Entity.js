import { utils } from 'pixi.js'
import { splice } from '#/utils/fast'

const { uid } = utils

/**
 * An entity.
 *
 * @class  Entity
 */
class Entity {
  /**
   * @class Entity
   * @constructor
   *
   * @param {Array[Component]} [components=[]] An array of initial components.
   */
  constructor(components = []) {
    /**
     * Unique identifier of the entity.
     *
     * @property {Number} id
     */
    this.id = uid()

    /**
     * Systems applied to the entity.
     *
     * @property {Array[System]} systems
     */
    this.systems = []

    /**
     * Indiquate a change in components (a component was removed or added)
     * which require to re-compute entity eligibility to all systems.
     *
     * @property {Boolean} systemsDirty
     */
    this.systemsDirty = false

    /**
     * Components of the entity stored as key-value pairs.
     *
     * @property {Object} components
     */
    this.components = {}
    for (const component of components) {
      const { name, data } = component
      this.components[name] = data
    }

    /**
     * A reference to parent ECS class.
     * @property {ECS} ecs
     */
    this.ecs = null
  }

  /**
   * Set the parent ecs reference.
   *
   * @private
   * @param {ECS} ecs An ECS class instance.
   */
  addToECS(ecs) {
    this.ecs = ecs
    this.setSystemsDirty()
  }

  /**
   * Set the systems dirty flag so the ECS knows this entity
   * needs to recompute eligibility at the beginning of next
   * tick.
   */
  setSystemsDirty() {
    if (!this.systemsDirty && this.ecs) {
      this.systemsDirty = true

      // notify to parent ECS that this entity needs to be tested next tick
      this.ecs.entitiesSystemsDirty.push(this)
    }
  }

  /**
   * Add a system to the entity.
   *
   * @private
   * @param {System} system The system to add.
   */
  addSystem(system) {
    this.systems.push(system)
  }

  /**
   * Remove a system from the entity.
   *
   * @private
   * @param  {System} system The system reference to remove.
   */
  removeSystem(system) {
    const index = this.systems.indexOf(system)

    if (index !== -1) {
      splice(this.systems, index, 1)
    }
  }

  /**
   * Add a component to the entity.
   *
   * WARNING: this method does not copy components data but assign directly the
   * reference for maximum performances. Be sure not to pass the same component
   * reference to many entities.
   *
   * @param {String} name Attribute name of the component to add.
   * @param {Object} data Component data.
   */
  addComponent(component) {
    const { name, data } = component
    this.components[name] = data
    this.setSystemsDirty()
  }

  /**
   * Remove a component from the entity. To preserve performances, we
   * simple set the component property to `undefined`. Therefore the
   * property is still enumerable after a call to removeComponent()
   *
   * @param  {String} name Name of the component to remove.
   */
  removeComponent(name) {
    if (!this.components[name]) {
      return
    }

    this.components[name] = undefined
    this.setSystemsDirty()
  }

  /**
   * Update a component field by field, NOT recursively. If the component
   * does not exists, this method will do nothing.
   *
   * @method updateComponent
   * @param  {String} name Name of the component
   * @param  {Object} data Dict of attributes to update
   * @example
   *   entity.addComponent('kite', {vel: 0, pos: {x: 1}});
   *   // entity.component.pos is '{vel: 0, pos: {x: 1}}'
   *   entity.updateComponent('kite', {angle: 90, pos: {y: 1}});
   *   // entity.component.pos is '{vel: 0, angle: 90, pos: {y: 1}}'
   */
  updateComponent(name, data) {
    const component = this.components[name]

    if (component) {
      const keys = Object.keys(data)

      for (const key of keys) {
        component[key] = data[key]
      }
    }
  }

  /**
   * Update a set of components.
   *
   * @param  {Object} componentsData Dict of components to update.
   */
  updateComponents(componentsData) {
    const components = Object.keys(componentsData)

    for (const component of components) {
      this.updateComponent(component, componentsData[component])
    }
  }

  /**
   * Dispose the entity.
   *
   * @private
   */
  dispose() {
    for (const system of this.systems) {
      system.removeEntity(this)
    }
  }
}

export default Entity
