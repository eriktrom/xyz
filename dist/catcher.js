/*
TODO: add heapdump
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

exports['default'] = Object.defineProperties({
  logStack: function logStack(msg, err, callback) {
    if (typeof msg !== 'string') {
      if (arguments.length === 1) {
        ;
        msg = '';
        err = arguments[0];
        callback = false;
      }if (arguments.length === 2) {
        ;
        msg = '';
        err = arguments[0];
        callback = arguments[1];
      }
    }

    var formattedErr = {
      message: err.message,
      stack: err.stack,
      timestamp: Date.now()
    };

    this.logger.error(msg, JSON.stringify(formattedErr, null, 4));
    if (process.env.NODE_ENV !== 'test') console.error(msg, JSON.stringify(formattedErr, null, 4));
    if (callback) return callback();
  },

  setup: function setup() {
    var _this = this;

    /* $lab:coverage:off$ */
    process.once('uncaughtException', function (err) {
      _this.logStack(err, function () {
        return process.exit(1);
      });
    });

    process.on('unhandledRejection', function (reason, promise) {
      _this.logStack(reason, function () {
        _this.logger.error('Caught global unhandledRejection with reason, promise %o %o', reason, promise);
      });
    });
    /* $lab:coverage:on$ */
  }
}, {
  logger: {
    set: function set(logger) {
      this._logger = logger;
    },
    get: function get() {
      return this._logger || _logger2['default'];
    },
    configurable: true,
    enumerable: true
  }
});
module.exports = exports['default'];
//# sourceMappingURL=catcher.js.map