import PIXI from '../../pixi'

const { SpritesheetLoader, utils } = PIXI

export function patch() {
  SpritesheetLoader.getResourcePath = (resource, baseUrl) => {
    if (resource.metadata.image) {
      return resource.metadata.image
    }

    if (resource.isDataUrl) {
      return resource.data.meta.image
    }

    return utils.url.resolve(
      resource.url.replace(baseUrl, ''),
      resource.data.meta.image
    )
  }
}
