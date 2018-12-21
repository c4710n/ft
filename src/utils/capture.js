const renderer = PIXI.autoDetectRenderer(750, 1500)
const rt = PIXI.RenderTexture.create(750, 1500)

renderer.render(this, rt)
const dataURL = renderer.extract.base64(this)
