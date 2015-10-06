'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _wreck = require('wreck');

var _wreck2 = _interopRequireDefault(_wreck);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _logger = require('../../logger');

var _logger2 = _interopRequireDefault(_logger);

_bluebird2['default'].promisifyAll(_wreck2['default']);

var HttpClient = (function () {
  function HttpClient() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, HttpClient);

    options = _hoek2['default'].applyToDefaults({
      host: 'https://slack.com'
    }, options);

    if (!options.token) throw Error('Must provide api token when instantiating a new slack http client');

    this.host = options.host;
    this.token = options.token;
  }

  _createClass(HttpClient, [{
    key: 'get',
    value: function get() {
      return this._request.apply(this, arguments);
    }
  }, {
    key: 'getAllChannelHistory',
    value: function getAllChannelHistory() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      options = _hoek2['default'].applyToDefaults({
        delay: 20000
      }, options);

      var delay = Number(options.delay);
      var self = this;
      function waitThenFetch(channel, idx) {
        return new _bluebird2['default'](function (resolve) {
          setTimeout(function () {
            _logger2['default'].info("channel.id is %o", channel.id);
            resolve(self.get('channels.history', { query: { channel: channel.id, latest: '1443068979.007719' } }));
          }, delay * (idx + 1));
        });
      }

      return this.get('channels.list').then(function (res) {

        var responses = [];
        for (var i = 0; i < res.channels.length; i++) {
          var channel = res.channels[i];
          responses.push(waitThenFetch(channel, i));
        }

        return _bluebird2['default'].settle(responses);
      });
    }

    // private

  }, {
    key: '_request',
    value: function _request(type) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? { query: {} } : arguments[1];

      var defaults = { method: 'GET', requestOptions: {} };
      options = _hoek2['default'].applyToDefaults(defaults, options);

      var method = options.method,
          url = this._buildUrl(type, options.query),
          requestOptions = options.requestOptions;

      return _wreck2['default'].requestAsync(method, url, requestOptions).then(function (res) {
        return _wreck2['default'].readAsync(res, { json: 'force' });
      }).then(function (body) {
        if (body.ok) return body;else throw Error(body);
      })['catch'](function (err) {
        return _logger2['default'].error('Error reading response for ' + type + ' with options ' + options, err);
      });
    }
  }, {
    key: '_buildUrl',
    value: function _buildUrl(type) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      query = _hoek2['default'].applyToDefaults({ token: this.token }, query);
      return this.host + '/api/' + type + '?' + _querystring2['default'].stringify(query);
    }
  }]);

  return HttpClient;
})();

exports['default'] = HttpClient;
module.exports = exports['default'];
//# sourceMappingURL=http.js.map