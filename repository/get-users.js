var _fs = require("fs"),
  _fs2 = _interopRequireDefault(_fs),
  _path = require("path"),
  _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}

const getUsers = function () {
  return new Promise(function (r, u) {
    var e = 500 * Math.random() + 300;
    setTimeout(function () {
      _fs2.default.readFile(
        _path2.default.join(__dirname, "./userdata"),
        function (e, t) {
          e && u(e);
          try {
            r(JSON.parse(Buffer.from(t.toString(), "base64").toString()));
          } catch (e) {
            u(e);
          }
        }
      );
    }, e);
  });
};

module.exports = getUsers;
