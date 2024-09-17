import throttle from 'lodash.throttle'

export class Loop {
  constructor(cb, wait) {
    this.cb = throttle(cb, wait)
    this.isActive = null
  }

  start() {
    this.cb()
    this.isActive = window.requestAnimationFrame(this.start.bind(this))
    return this
  }

  stop() {
    window.cancelAnimationFrame(this.isActive)
  }
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
