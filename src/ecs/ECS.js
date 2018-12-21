import { splice } from '#/utils/fast'

/**
 * @class  ECS
 */
class ECS {
  /**
   * @constructor
   * @class  ECS
   */
  constructor() {
    /**
     * Store all entities of the ECS.
     *
     * @property entities
     * @type {Array}
     */
    this.entities = []

    /**
     * Store entities which need to be tested at beginning of next tick.
     *
     * @property entitiesSystemsDirty
     * @type {Array}
     */
    this.entitiesSystemsDirty = []

    /**
     * Store all systems of the ECS.
     *
     * @property systems
     * @type {Array}
     */
    this.systems = []

    /**
     * Count how many updates have been done.
     *
     * @property updateCounter
     * @type {Number}
     */
    this.updateCounter = 0
  }

  /**
   * Retrieve an entity by id
   * @param  {Number} id id of the entity to retrieve
   * @return {Entity} The entity if found null otherwise
   */
  getEntityById(id) {
    for (const entity of this.entities) {
      if (entity.id === id) {
        return entity
      }
    }

    return null
  }

  /**
   * Add an entity to the ecs.
   *
   * @method addEntity
   * @param {Entity} entity The entity to add.
   */
  addEntity(entity) {
    this.entities.push(entity)
    entity.addToECS(this)
  }

  /**
   * Remove an entity from the ecs by reference.
   *
   * @method removeEntity
   * @param  {Entity} entity reference of the entity to remove
   * @return {Entity}        the remove entity if any
   */
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    let entityRemoved = null

    // if the entity is not found do nothing
    if (index !== -1) {
      entityRemoved = this.entities[index]

      entityRemoved.dispose()
      this.removeEntityIfDirty(entityRemoved)
      splice(this.entities, index, 1)
    }

    return entityRemoved
  }

  /**
   * Remove an entity from the ecs by entity id.
   *
   * @method removeEntityById
   * @param  {Entity} id id of the entity to remove
   * @return {Entity}          removed entity if any
   */
  removeEntityById(id) {
    const index = this.entities.findIndex(entity => entity.id === id)
    let entityRemoved = null

    if (index !== -1) {
      entityRemoved = this.entities[index]

      entityRemoved.dispose()
      this.removeEntityIfDirty(entityRemoved)
      splice(this.entities, index, 1)
    }

    return entityRemoved
  }

  /**
   * Remove an entity from dirty entities by reference.
   *
   * @private
   * @method removeEntityIfDirty
   * @param  {[type]} entity entity to remove
   */
  removeEntityIfDirty(entity) {
    const index = this.entitiesSystemsDirty.indexOf(entity)

    if (index !== -1) {
      splice(this.entities, index, 1)
    }
  }

  /**
   * Add a system to the ecs.
   *
   * @method addSystem
   * @param {System} system system to add
   */
  addSystem(system) {
    this.systems.push(system)

    for (const entity of this.entities) {
      if (system.test(entity)) {
        system.addEntity(entity)
      }
    }
  }

  /**
   * Remove a system from the ecs.
   *
   * @method removeSystem
   * @param  {System} system system reference
   */
  removeSystem(system) {
    const index = this.systems.indexOf(system)

    if (index !== -1) {
      splice(this.systems, index, 1)
      system.dispose()
    }
  }

  /**
   * "Clean" entities flagged as dirty by removing unecessary systems and
   * adding missing systems.
   *
   * @private
   * @method cleanDirtyEntities
   */
  cleanDirtyEntities() {
    // jshint maxdepth: 4

    for (const entity of this.entitiesSystemsDirty) {
      for (const system of this.systems) {
        // for each dirty entity for each system
        const index = entity.systems.indexOf(system)
        const entityTest = system.test(entity)

        if (index === -1 && entityTest) {
          // if the entity is not added to the system yet and should be, add it
          system.addEntity(entity)
        } else if (index !== -1 && !entityTest) {
          // if the entity is added to the system but should not be, remove it
          system.removeEntity(entity)
        }
        // else we do nothing the current state is OK
      }

      entity.systemsDirty = false
    }

    this.entitiesSystemsDirty = []
  }

  /**
   * Update the ecs.
   *
   * @method update
   */
  update(dt) {
    for (const system of this.systems) {
      if (this.updateCounter % system.frequency > 0) {
        break
      }

      if (this.entitiesSystemsDirty.length) {
        // if the last system flagged some entities as dirty check that case
        this.cleanDirtyEntities()
      }

      system.updateAll(dt)
    }

    this.updateCounter += 1
  }
}

export default ECS
