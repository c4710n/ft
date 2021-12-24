import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import { PIXI } from '../../core';
var SpritesheetLoader = PIXI.SpritesheetLoader,
    utils = PIXI.utils;
export function patch() {
  SpritesheetLoader.getResourcePath = function (resource, baseUrl) {
    if (resource.metadata.image) {
      return resource.metadata.image;
    }

    if (resource.isDataUrl) {
      return resource.data.meta.image;
    }

    return utils.url.resolve(resource.url.replace(baseUrl, ''), resource.data.meta.image);
  };
}
//# sourceMappingURL=spritesheet.js.map