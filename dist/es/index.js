'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var Es = Object.defineProperties({

  create: function create() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _bluebird2['default'].resolve(new _elasticsearch2['default'].Client(_hoek2['default'].applyToDefaults({
      hosts: [{
        host: 'localhost',
        port: '9200'
      }],
      log: {
        type: 'file',
        level: 'trace',
        path: _config2['default'].esLogPath, // TODO: handle environments, connection pool, winston, etc
        sniffOnStart: true,
        sniffInterval: 60000,
        sniffOnConnectionFault: true,
        maxSockets: 30,
        suggestCompression: true
      },
      defer: function defer() {
        return _bluebird2['default'].defer();
      },
      apiVersion: '1.7'
    }, options))).then(function (client) {
      _this.client = client;
      return client;
    });
  }
}, {
  client: {
    set: function set(client) {
      this._client = client;
    },
    get: function get() {
      if (this._client) return this._client;else throw Error('You must call create before using a getter to get the client');
    },
    configurable: true,
    enumerable: true
  }
});

exports['default'] = Es;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map