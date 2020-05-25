function setOrigin(originX, originY) {
  // cache origin on object
  if (originY === undefined) {
    this.originX = originX
    this.originY = originX
  } else {
    this.originX = originX
    this.originY = originY
  }

  if (this.anchor) {
    if (originX !== undefined) this.anchor.x = originX
    if (originY !== undefined) this.anchor.y = originY

    if (originY === undefined) {
      const origin = originX
      this.anchor.x = origin
      this.anchor.y = origin
    }
  } else if (this.pivot) {
    if (originX !== undefined) {
      this.pivot.x = (originX * this.width) / this.scale.x
    }

    if (originY !== undefined) {
      this.pivot.y = (originY * this.height) / this.scale.y
    }

    if (originY === undefined) {
      const origin = originX
      this.pivot.x = (origin * this.width) / this.scale.x
      this.pivot.y = (origin * this.height) / this.scale.y
    }
  }

  return this
}

function setSize(width, height) {
  if (width !== undefined) this.width = width
  if (height !== undefined) this.height = height

  return this
}

function setWidth(width) {
  this.width = width

  return this
}

function setHeight(height) {
  this.height = height

  return this
}

function setPosition(x, y) {
  if (x !== undefined) this.x = x
  if (y !== undefined) this.y = y

  return this
}

function setPositionX(x) {
  this.x = x

  return this
}

function setPositionY(y) {
  this.y = y

  return this
}

function setScale(scaleX, scaleY) {
  if (scaleX !== undefined) this.scale.x = scaleX
  if (scaleY !== undefined) this.scale.y = scaleY

  if (scaleY === undefined) {
    this.scale.set(scaleX)
  }

  return this
}

function setScaleX(scaleX) {
  this.scale.x = scaleX

  return this
}

function setScaleY(scaleY) {
  this.scale.y = scaleY

  return this
}

function setAlpha(alpha) {
  this.alpha = alpha

  return this
}

function setRotation(rotation) {
  this.rotation = rotation

  return this
}

function setAngle(angle) {
  this.angle = angle

  return this
}

function setTint(value) {
  this.tint = value

  return this
}

function setFilters(filters) {
  let _filters

  if (!Array.isArray(filters)) {
    _filters = [filters]
  } else {
    _filters = filters
  }

  this.filters = _filters
  return this
}

function clearFilters() {
  this.filters = []
  return this
}

function setInteractive(value = true, { includeChildren } = {}) {
  this.interactive = value

  if (includeChildren) {
    this.interactiveChildren = value
  }

  return this
}

function setVisible(value = true) {
  this.visible = value

  return this
}

function removeSelf() {
  if (this.parent) {
    this.parent.removeChild(this)
  }
}

function getComponent(name) {
  return this.components[name]
}

export default function patchDisplayObjectMethods(prototype) {
  prototype.setOrigin = setOrigin
  prototype.setSize = setSize
  prototype.setWidth = setWidth
  prototype.setHeight = setHeight
  prototype.setPosition = setPosition
  prototype.setPositionX = setPositionX
  prototype.setPositionY = setPositionY
  prototype.setScale = setScale
  prototype.setScaleX = setScaleX
  prototype.setScaleY = setScaleY
  prototype.setAlpha = setAlpha
  prototype.setRotation = setRotation
  prototype.setAngle = setAngle
  prototype.setTint = setTint
  prototype.setFilters = setFilters
  prototype.clearFilters = clearFilters
  prototype.setInteractive = setInteractive
  prototype.setVisible = setVisible

  prototype.removeSelf = removeSelf

  prototype.getComponent = getComponent
}
