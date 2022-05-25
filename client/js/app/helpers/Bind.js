"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bind = void 0;

var _ProxyFactory = require("../services/ProxyFactory.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = /*#__PURE__*/_createClass(function Bind(model, view) {
  _classCallCheck(this, Bind);

  for (var _len = arguments.length, prop = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    prop[_key - 2] = arguments[_key];
  }

  var proxy = _ProxyFactory.ProxyFactory.create(model, prop, function (model) {
    return view.update(model);
  });

  view.update(model);
  return proxy;
});

exports.Bind = Bind;
//# sourceMappingURL=Bind.js.map