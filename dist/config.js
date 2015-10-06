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
  TODO: This list of types should be dynamic, meaning at runtime I should
  be able to add to it and start a new connection to a new slack, irc or gitter
  team/channel on the fly. Consider any streaming api for thought experiment.
  Twitter for example, is obvious here too, although i'm not a fan, but others are.
   This should be considered along with UI configured index templates for ES.
  The UI seems similar and I'll know more by then about ES in general.
   */
  types: Object.defineProperties({}, {
    slack: {
      get: function get() {
        if (this._slack) return this._slack;

        try {
          return JSON.parse(_fs2['default'].readFileSync(Config.configuredTeamsPath));
        } catch (err) {
          if (/teams\.json/.test(err.message)) {

            var msg = '\nPlease make a teams.json in root of the application or make an env\nvariable named CONFIGURED_TEAMS_PATH that points to its path.\n\nIt may contain:\n\n  {\n    "hapi": {\n      "name": "Hapi Community",\n      "index": "hapicommunity.slack.com",\n      "token": "a-token-that-you-should-not-commit-to-git"\n    },\n    "ember": {\n      "name": "Ember Community",\n      "index": "embercommunity.slack.com",\n      "token": "a-different-token-keep-me-safe"\n    },\n    "work": {\n      "name": "A Nice Place to Work During the Day",\n      "index": "somaplacenice.slack.com",\n      "token": "keep-extremely-safe"\n    }\n  }\n          ';

            if (process.env.NODE_ENV !== 'test') console.error(msg, err);
          } else {
            throw err;
          }
        }
      },

      // now that i've done this setter stuff > 1 in this lib, do i like it?
      // It makes the getter easier to test. Yay, nay?
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
  },
  configuredTeamsPath: {
    get: function get() {
      return process.env.CONFIGURED_TEAMS_PATH || 'teams.json';
    },
    configurable: true,
    enumerable: true
  }
});

exports['default'] = Config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map