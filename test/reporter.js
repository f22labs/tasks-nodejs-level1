"use strict";
var _mocha = require("mocha"),
  _mocha2 = _interopRequireDefault(_mocha);
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
var Base = _mocha2.default.reporters.Base,
  inherits = _mocha2.default.utils.inherits,
  color = Base.color,
  cursor = Base.cursor;
function AssessmentReporter(a, b) {
  Base.call(this, a);
  var c = this,
    d = 0 | (0.5 * Base.window.width),
    e = a.total,
    f = 0,
    g = -1;
  b = b || {};
  var h = b.reporterOptions || {};
  (b.open = h.open || "["),
    (b.complete = h.complete || "\u25AC"),
    (b.incomplete = h.incomplete || Base.symbols.dot),
    (b.close = h.close || "]"),
    (b.verbose = h.verbose || !1),
    a.on("start", function () {
      console.log(), cursor.hide();
    }),
    a.on("test end", function () {
      f++;
      var a = f / e,
        c = 0 | (d * a);
      (c != g || b.verbose) &&
        ((g = c),
        cursor.CR(),
        process.stdout.write("\x1B[J"),
        process.stdout.write(color("progress", "  " + b.open)),
        process.stdout.write(Array(c).join(b.complete)),
        process.stdout.write(Array(d - c).join(b.incomplete)),
        process.stdout.write(color("progress", b.close)),
        b.verbose &&
          process.stdout.write(color("progress", " " + f + " of " + e)));
    }),
    a.once("end", function () {
      cursor.show();
      var a = c.stats.passes,
        b = c.stats.failures,
        d = Math.ceil((100 * a) / (a + b));
      console.log();
      var e = 75 <= d ? "green" : "fail",
        f =
          color("bright pass", " ") +
          color(e, "================ pass %d % ===================");
      console.log(f, d), console.log(), process.exit(0);
    });
}
inherits(AssessmentReporter, Base), (module.exports = AssessmentReporter);
