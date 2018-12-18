import { splice } from '../utils/fast'

/**
 * @class  System
 *
 * @description  A system update all eligible entities at a given frequency.
 * This class is not meant to be used directly and should be sub-classed to
 * define specific logic.
 */
class System {
  /**
   * @class  System
   * @constructor
   * @param [frequency=1] {Number} Frequency of execution.
   */
  constructor(frequency = 1) {
    /**
     * Frequency of update execution, a frequency of `1` run the system every
     * update, `2` will run the system every 2 updates, etc.
     * @property {Number} frequency
     */
    this.frequency = frequency

    /**
     * Entities of current system.
     *
     * @property {Array[Entity]} entities
     */
    this.entities = []
  }

  /**
   * Add an entity to the system entities.
   *
   * @param {Entity} entity The entity will added to current system.
   */
  addEntity(entity) {
    entity.addSystem(this)
    this.entities.push(entity)

    this.enter(entity)
  }

  /**
   * Remove an entity from current system entities. exit() handler is executed
   * only if the entity actually exists in the system entities.
   *
   * @param  {Entity} entity Reference of the entity to remove.
   */
  removeEntity(entity) {
    const index = this.entities.indexOf(entity)

    if (index !== -1) {
      entity.removeSystem(this)
      splice(this.entities, index, 1)

      this.exit(entity)
    }
  }

  /**
   * Apply update to each entity of this system.
   *
   * @method  updateAll
   */
  updateAll(dt) {
    this.preUpdate()

    for (const entity of this.entities) {
      this.update(entity, dt)
    }

    this.postUpdate()
  }

  /**
   * dispose the system by exiting all the entities
   *
   * @method  dispose
   */
  dispose() {
    for (const entity of this.entities) {
      entity.removeSystem(this)
      this.exit(entity)
    }
  }

  /**
   * Abstract method to subclass.
   * Called once per update, before entities iteration.
   *
   * @method  preUpdate
   */
  preUpdate() {}

  /**
   * Abstract method to subclass.
   * Called for each entity to update. This is the only method that should
   * actual mutate entity state.
   *
   * @method  update
   * @param  {Entity} entity The entity to update.
   */
  // eslint-disable-next-line no-unused-vars
  update(entity) {}

  /**
   * Abstract method to subclass.
   * Called once per update, after entities iteration.
   *
   * @method  postUpdate
   */
  postUpdate() {}

  /**
   * Abstract method to subclass. Should return true if the entity is eligible
   * to the system, false otherwise.
   *
   * @method  test
   * @param  {Entity} entity The entity to test.
   */
  // eslint-disable-next-line no-unused-vars
  test(entity) {
    return false
  }

  /**
   * Abstract method to subclass.
   * Called when an entity is added to the system.
   *
   * @method  enter
   * @param  {Entity} entity The added entity.
   */
  // eslint-disable-next-line no-unused-vars
  enter(entity) {}

  /**
   * Abstract method to subclass.
   * Called when an entity is removed from the system.
   *
   * @method  exit
   * @param  {Entity} entity The removed entity.
   */
  // eslint-disable-next-line no-unused-vars
  exit(entity) {}
}

export default System
