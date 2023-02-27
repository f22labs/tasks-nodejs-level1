"use strict";
var _chai = require("chai"),
  _chai2 = _interopRequireDefault(_chai),
  _chaiAsPromised = require("chai-as-promised"),
  _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised),
  _sinonChai = require("sinon-chai"),
  _sinonChai2 = _interopRequireDefault(_sinonChai);
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
_chai2.default.use(_chaiAsPromised2.default).should(),
  _chai2.default.use(_sinonChai2.default);
