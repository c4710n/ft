import { splice } from '../utils/fast'
import { PIXI } from '../core'

export const { UPDATE_PRIORITY } = PIXI

/**
 * Basic class for system.
 */
class System {
  /**
   * @param [frequency=1] {number} frequency of execution.
   */
  constructor(name, updatePriority = UPDATE_PRIORITY.NORMAL) {
    this.name = name
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
