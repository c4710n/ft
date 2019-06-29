import EventEmitter from 'eventemitter3'
import Device from '../core/Device'

const EE = new EventEmitter()

const EVENT_RESIZE = 'resize'
function emitResizeEvent() {
  const { width, height } = Device.cssSize.clone()
  EE.emit(EVENT_RESIZE, { width, height })
}
const resize = {}
resize.on = function(...args) {
  EE.on(EVENT_RESIZE, ...args)
}
resize.emit = emitResizeEvent

const EVENT_SCALE = 'scale'
const scale = {}
scale.on = function(...args) {
  EE.on(EVENT_SCALE, ...args)
}
scale.emit = function(...args) {
  EE.emit(EVENT_SCALE, ...args)
}

const EVENT_SHOW = 'show'
const show = {}
show.on = function(...args) {
  EE.on(EVENT_SHOW, ...args)
}
show.emit = function(...args) {
  EE.emit(EVENT_SHOW, ...args)
}

const EVENT_HIDE = 'hide'
const hide = {}
hide.on = function(...args) {
  EE.on(EVENT_HIDE, ...args)
}
hide.emit = function(...args) {
  EE.emit(EVENT_HIDE, ...args)
}

export default {
  resize,
  scale,
  show,
  hide,
}
