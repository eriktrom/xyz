'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var Logger = new _winston2['default'].Logger({
  transports: [new _winston2['default'].transports.Console({ level: 'log' }), new _winston2['default'].transports.File({ filename: _config2['default'].winstonLogPath, level: 'debug' })]
});

exports['default'] = Logger;
module.exports = exports['default'];
//# sourceMappingURL=logger.js.map