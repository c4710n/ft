import PIXI from '#/pixi'

export function patch() {
  PIXI.SpritesheetLoader.getResourcePath = (resource, baseUrl) => {
    if (resource.metadata.image) {
      return resource.metadata.image
    }

    if (resource.isDataUrl) {
      return resource.data.meta.image
    }

    return PIXI.utils.url.resolve(
      resource.url.replace(baseUrl, ''),
      resource.data.meta.image
    )
  }
}
