/*
TODO: add heapdump
 */

import Logger from './logger'

export default {
  logStack(msg, err, callback) {
    if (typeof msg !== 'string') {
      if (arguments.length === 1) [msg, err, callback] = ['', arguments[0], false]
      if (arguments.length === 2) [msg, err, callback] = ['', arguments[0], arguments[1]]
    }

    let formattedErr = {
      message: err.message,
      stack: err.stack,
      timestamp: Date.now()
    }

    this.logger.error(msg, JSON.stringify(formattedErr, null, 4))
    if (process.env.NODE_ENV !== 'test') console.error(msg, JSON.stringify(formattedErr, null, 4))
    if (callback) return callback()
  },

  set logger(logger) { this._logger = logger },
  get logger() { return this._logger || Logger },

  setup() {

    /* $lab:coverage:off$ */
    process.once('uncaughtException', err => {
      this.logStack(err, () => process.exit(1))
    })

    process.on('unhandledRejection', (reason, promise) => {
      this.logStack(reason, () => {
        this.logger.error('Caught global unhandledRejection with reason, promise %o %o', reason, promise)
      })
    })
    /* $lab:coverage:on$ */

  }
}
