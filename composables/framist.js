import throttle from 'lodash.throttle'

export class Loop {
  constructor(cb, wait) {
    this.cb = throttle(cb, wait)
    this.raf = null
  }

  start() {
    this.cb()
    this.raf = window.requestAnimationFrame(this.start.bind(this))
    return this
  }

  stop() {
    window.cancelAnimationFrame(this.raf)
  }
}
