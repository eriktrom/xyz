'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _es = require('../../es');

var _es2 = _interopRequireDefault(_es);

// TODO: when losing internet connection no failure currently surfaces.
// TODO: after fixing ^^, do an exponential connection backoff retry, copy it from nes

var Socket = (function () {
  function Socket(url, team) {
    _classCallCheck(this, Socket);

    if (!url || !team) throw Error('Must pass url and team to make a new slack socket connection');

    this.name = team.name;
    this.index = team.index;
    this.connection = new _ws2['default'](url);
  }

  _createClass(Socket, [{
    key: 'connect',
    value: function connect() {
      this.connection.on('open', this.didReceiveOpen.bind(this));
      this.connection.on('close', this.didReceiveClose.bind(this));
      this.connection.on('message', this.didReceiveMessage.bind(this));
      this.connection.on('error', this.didReceiveError.bind(this));
    }
  }, {
    key: 'didReceiveMessage',
    value: function didReceiveMessage(message) {
      var data = JSON.parse(message);
      var newRecord = { index: this.index, type: data.type, body: data };
      _logger2['default'].info(data);
      return _es2['default'].client.index(newRecord);
    }
  }, {
    key: 'didReceiveOpen',
    value: function didReceiveOpen() {
      _logger2['default'].info('native - open: The connection to ' + this.name + ' has been opened');
    }
  }, {
    key: 'didReceiveClose',
    value: function didReceiveClose() {
      _logger2['default'].info('native - close: The connection to ' + this.name + ' has been closed');
    }
  }, {
    key: 'didReceiveError',
    value: function didReceiveError(err) {
      _logger2['default'].error('Slack websocket error event received', err);
    }
  }]);

  return Socket;
})();

exports['default'] = Socket;
module.exports = exports['default'];
//# sourceMappingURL=socket.js.map