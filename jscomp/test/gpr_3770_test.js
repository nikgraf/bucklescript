'use strict';


function show(param) {
  var a = param[0];
  if (a === 0 && param[1] === 0 && param[2] === 0) {
    return "zeroes";
  }
  return String(a) + String(param[1]);
}

exports.show = show;
/* No side effect */
