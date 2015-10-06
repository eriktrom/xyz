'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _catcher = require('./catcher');

var _catcher2 = _interopRequireDefault(_catcher);

var _es = require('./es');

var _es2 = _interopRequireDefault(_es);

var _connectionsSlack = require('./connections/slack');

var _connectionsSlack2 = _interopRequireDefault(_connectionsSlack);

if (!module.parent) {
  start();
}

function start() {
  _catcher2['default'].setup();

  return _es2['default'].create().then(function () {
    return _connectionsSlack2['default'].start();
  })['catch'](function (err) {
    return _catcher2['default'].logStack(err, function () {
      return process.exit(1);
    });
  });
}
//# sourceMappingURL=index.js.map