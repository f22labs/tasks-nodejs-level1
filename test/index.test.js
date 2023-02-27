"use strict";
var _supertest = require("supertest"),
  _supertest2 = _interopRequireDefault(_supertest),
  _faker = require("faker"),
  _faker2 = _interopRequireDefault(_faker),
  _fs = require("fs"),
  _fs2 = _interopRequireDefault(_fs),
  _path = require("path"),
  _path2 = _interopRequireDefault(_path),
  _lodash = require("lodash"),
  _lodash2 = _interopRequireDefault(_lodash),
  _pathToRegexp = require("path-to-regexp"),
  _pathToRegexp2 = _interopRequireDefault(_pathToRegexp),
  _app = require("../app"),
  _app2 = _interopRequireDefault(_app);
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
var getRandomUser = function () {
  return _lodash2.default.sample(
    JSON.parse(
      Buffer.from(
        _fs2.default
          .readFileSync(
            _path2.default.join(__dirname, "../repository/userdata")
          )
          .toString(),
        "base64"
      ).toString()
    )
  );
};
describe("NodeJs", function () {
  context("readme", function () {
    var a = _faker2.default.lorem.paragraphs(2),
      b = _faker2.default.datatype.uuid() + ".txt",
      c = _path2.default.join(__dirname, "../files/readme", b);
    before(function () {
      _fs2.default.writeFileSync(c, a);
    }),
      after(function () {
        _fs2.default.unlink(c, function (a) {
          a && console.error(a);
        });
      }),
      it("should be able to read from file system", function () {
        return (0, _supertest2.default)(_app2.default)
          .get("/files/" + b)
          .expect(200)
          .then(function (c) {
            console.log(c.body);
            var d = c.body;
            console.log(a);
            d.filename.should.equal(b),
              d.length.should.equal(a.length),
              d.content.should.equal(a);
          });
      }),
      it("should return 404 when file not found", function () {
        return (0, _supertest2.default)(_app2.default)
          .get("/files/some-thing-not-exist.txt")
          .expect(404)
          .then(function (a) {
            a.body.should.be.deep.equal({
              error: "file not found!",
              code: 404,
            });
          });
      });
  }),
    context("RESTful", function () {
      context("A", function () {
        it("should return a json array", function () {
          return (0, _supertest2.default)(_app2.default)
            .get("/users")
            .expect(200)
            .then(function (a) {
              var b = a.body;
              b.should.be.an.instanceOf(Array), b.should.have.lengthOf(100);
            });
        }),
          it("should return json with minimal data", function () {
            return (0, _supertest2.default)(_app2.default)
              .get("/users")
              .expect(200)
              .then(function (a) {
                var b = a.body;
                b.should.be.an.instanceOf(Array),
                  b.should.have.lengthOf.above(1),
                  b.forEach(function (a) {
                    a.should.have.property("_id"),
                      a.should.have.property("isActive"),
                      a.should.have.property("firstName"),
                      a.should.have.property("lastName"),
                      a.should.have.property("balance"),
                      a.should.not.have.property("age"),
                      a.should.not.have.property("eyeColor"),
                      a.should.not.have.property("company"),
                      a.should.not.have.property("email"),
                      a.should.not.have.property("phone"),
                      a.should.not.have.property("address"),
                      a.should.not.have.property("registered");
                  });
              });
          });
      }),
        context("B", function () {
          var a, b;
          before(function () {
            var c = listRoutes();
            (a = _lodash2.default.filter(c, function (a) {
              return /\/users\/.+/.test(a.path);
            })),
              (b = _lodash2.default.head(a));
          }),
            it("should have at least one API", function () {
              a.should.have.lengthOf.above(0);
            }),
            context("should met API spec", function () {
              var a = void 0,
                c = [1, 2, 3].map(function () {
                  return getRandomUser();
                });
              before(function () {
                var c = [];
                b.should.not.be.undefined,
                  (0, _pathToRegexp2.default)(b.path, c),
                  c.should.have.lengthOf.above(0),
                  (a = _lodash2.default.head(c).name);
              }),
                c.forEach(function (c) {
                  it("run on id:" + c._id, function () {
                    var d = {};
                    d[a] = c._id;
                    var e = _pathToRegexp2.default.compile(b.path)(d),
                      f = _lodash2.default.toLower(b.method);
                    return (0, _supertest2.default)(_app2.default)
                      [f](e)
                      .expect(200)
                      .then(function (a) {
                        a.body.should.be.deep.equal(c);
                      });
                  });
                });
            });
        });
    });
});
function listRoutes(a, b, c) {
  return (
    (c = c || ""),
    b
      ? (b.forEach(function (b) {
          if (b.route && b.route.path) {
            var d = "";
            for (d in b.route.methods)
              b.route.methods[d] &&
                a.push({ method: d.toUpperCase(), path: c + b.route.path });
          } else if (b.handle && "router" == b.handle.name) {
            var e = b.regexp.source
              .replace("^\\", "")
              .replace("\\/?(?=\\/|$)", "");
            return listRoutes(a, b.handle.stack, c + e);
          }
        }),
        a)
      : listRoutes([], _app2.default._router.stack)
  );
}
