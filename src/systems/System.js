import { splice } from '#/utils/fast'

/**
 * Basic class for system.
 */
class System {
  /**
   * @param [frequency=1] {number} frequency of execution.
   */
  constructor(frequency = 1) {
    /**
     * Frequency of update execution, a frequency of `1` run the system every
     * update, `2` will run the system every 2 updates, etc.
     *
     * @property {number} frequency
     */
    this.frequency = frequency

    /**
     * Entities of current system.
     *
     * @property {Array} entities
     */
    this.entities = []
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity)

    if (index !== -1) {
      splice(this.entities, index, 1)
    }
  }

  /**
   * @override
   */
  // eslint-disable-next-line no-unused-vars
  update(dt) {}
}

export default System
