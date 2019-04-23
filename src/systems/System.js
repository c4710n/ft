import { splice } from '../utils/fast'
import { UPDATE_PRIORITY } from '../const'

/**
 * Basic class for system.
 */
class System {
  /**
   * @param [frequency=1] {number} frequency of execution.
   */
  constructor(updatePriority = UPDATE_PRIORITY.NORMAL) {
    this.updatePriority = updatePriority

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
