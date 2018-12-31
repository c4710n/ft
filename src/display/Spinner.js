import PIXI from '#/pixi'

const dataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA+CAMAAABXyBiCAAAALVBMVEVHcEz////////////////////////////////////////////////////////NXt0CAAAADnRSTlMA6s6hkRr6RTdff3EJvuAfGLoAAAEnSURBVHja7dfbisUgDEBRk2jiNf//uUMhdChWe3IY5qnrsbArRagx3EtSWm2tSAof6hKR9cQjynOUCVRZr4DyNhLUBSzrlVA3UBZLsW6wKqW7DPQJyFz1y7uRiGIccF2R25yxmlGln09zu3xxnLqoB6jTF+QIm64TWzRJtFsvpU82pwSPqAaSq6tqMLgUtq46OzXZ15Fl5Mu6beAIPplt75yKbYGXDKQUXq/X62/kATYG+P98zZuRHjg7M7RDq//LaZB9Z+upftmhfnVIJlATvYePwbx+eV/PDqspLlVQqLsOYr6LDm3RGWy5B9OlDnvMECaN9QJGjESErL84zASuk6POMNzopHssrrn8eXMKLiN5vj6o4/pwkjhYT4xRepisr0atrq9GP5VpI3XLFWQCAAAAAElFTkSuQmCC'

/**
 * A simple spinner.
 *
 * @example
 * const spinner = FT.create(Spinner, { color: 0xff0000 })
 * container.addChild(spinner)
 */
class Spinner extends PIXI.Sprite {
  /**
   * @param {Object} options
   * @param {number} options.color=0x5699d2 spinner's color
   */
  constructor({ color = 0x5699d2 } = {}) {
    super()

    const image = new Image()
    image.src = dataURL

    /**
     * @ignore
     */
    this.texture = PIXI.Texture.from(image)

    /**
     * @ignore
     */
    this.tint = color

    this.anchor.set(0.5)
    this.scale.set(1.2)
  }

  onUpdate() {
    /**
     * @ignore
     */
    this.rotation += 0.1
  }
}

export default Spinner
