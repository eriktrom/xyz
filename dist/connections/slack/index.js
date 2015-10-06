/* $lab:coverage:off$ */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

/* $lab:coverage:on$ */

exports['default'] = {
  start: function start() {
    var slack = _config2['default'].types.slack,
        connections = [];

    for (var teamName in slack) {
      if (!({}).hasOwnProperty.call(slack, teamName)) continue;

      var team = slack[teamName];
      connections.push(this.newConnection(team));
    }

    return _bluebird2['default'].all(connections);
  },

  newConnection: function newConnection(team) {
    var HttpClient = arguments.length <= 1 || arguments[1] === undefined ? _http2['default'] : arguments[1];
    var SocketClient = arguments.length <= 2 || arguments[2] === undefined ? _socket2['default'] : arguments[2];

    return new HttpClient({ token: team.token }).get('rtm.start').then(function (body) {
      return new SocketClient(body.url, team).connect();
    });
  }
};
module.exports = exports['default'];
//# sourceMappingURL=index.js.map