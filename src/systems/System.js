import { splice } from '#/utils/fast'

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

  // eslint-disable-next-line no-unused-vars
  update(dt) {}
}

export default System
