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

function start() {
  window.addEventListener('resize', resize.emit)
  resize.emit()
}

export default {
  start,
  resize,
}