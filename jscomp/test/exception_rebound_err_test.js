'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");
var Curry = require("../../lib/js/curry.js");
var Pervasives = require("../../lib/js/pervasives.js");
var Caml_exceptions = require("../../lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");
var Caml_builtin_exceptions = require("../../lib/js/caml_builtin_exceptions.js");

var suites = /* record */{
  contents: /* [] */0
};

var test_id = /* record */{
  contents: 0
};

function eq(loc, x, y) {
  Pervasives.incr(test_id);
  suites.contents = /* :: */[
    /* tuple */[
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return /* Eq */Block.__(0, [
                    x,
                    y
                  ]);
        })
    ],
    suites.contents
  ];
  return /* () */0;
}

var A = Caml_exceptions.create("Exception_rebound_err_test.A");

var B = Caml_exceptions.create("Exception_rebound_err_test.B");

var C = Caml_exceptions.create("Exception_rebound_err_test.C");

function test_js_error4(param) {
  try {
    JSON.parse(" {\"x\"}");
    return 1;
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e === Caml_builtin_exceptions.not_found) {
      return 2;
    } else if (e[0] === Caml_builtin_exceptions.invalid_argument && e[1] === "x") {
      return 3;
    }
    if (e[0] === A) {
      if (e[1] !== 2) {
        return 7;
      } else {
        return 4;
      }
    } else if (e === B) {
      return 5;
    } else if (e[0] === C && !(e[1] !== 1 || e[2] !== 2)) {
      return 6;
    } else {
      return 7;
    }
  }
}

function f(g) {
  try {
    return Curry._1(g, /* () */0);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return 1;
    } else {
      throw exn;
    }
  }
}

eq("File \"exception_rebound_err_test.ml\", line 24, characters 6-13", test_js_error4(/* () */0), 7);

Mt.from_pair_suites("Exception_rebound_err_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.A = A;
exports.B = B;
exports.C = C;
exports.test_js_error4 = test_js_error4;
exports.f = f;
/*  Not a pure module */
