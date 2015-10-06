'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

require('dotenv').config();

var Config = Object.defineProperties({

  /*
  TODO: this list of types should be dynamic, meaning at runtime I should
  be able to add to it and start a new connection to a new slack, irc, gitter
  team/channel on the fly.
   This should drop when UI configured index templates for ES land. The UI
  seems similar and I'll know more by then about ES in general
   */
  types: Object.defineProperties({}, {
    slack: {
      get: function get() {
        if (this._slack) return this._slack;
        return JSON.parse(_fs2['default'].readFileSync(process.env.CONFIGURED_TEAMS_PATH));
      },
      set: function set(val) {
        this._slack = val;
      },
      configurable: true,
      enumerable: true
    }
  })
}, {
  logDir: {
    get: function get() {
      return _path2['default'].resolve(__dirname, '..', 'log');
    },
    configurable: true,
    enumerable: true
  },
  esLogPath: {
    get: function get() {
      _mkdirp2['default'].sync(Config.logDir);
      return _path2['default'].resolve(this.logDir, process.env.NODE_ENV + '.elasticsearch.log');
    },
    configurable: true,
    enumerable: true
  },
  winstonLogPath: {
    get: function get() {
      _mkdirp2['default'].sync(Config.logDir);
      return _path2['default'].resolve(this.logDir, process.env.NODE_ENV + '.winston.log');
    },
    configurable: true,
    enumerable: true
  }
});

exports['default'] = Config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map