"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _handleErrors = /*#__PURE__*/new WeakSet();

var HttpService = /*#__PURE__*/function () {
  function HttpService() {
    _classCallCheck(this, HttpService);

    _classPrivateMethodInitSpec(this, _handleErrors);
  }

  _createClass(HttpService, [{
    key: "get",
    value: function get(url) {
      var _this = this;

      return fetch(url).then(function (res) {
        return _classPrivateMethodGet(_this, _handleErrors, _handleErrors2).call(_this, res);
      }).then(function (res) {
        return res.json();
      });
    }
  }, {
    key: "post",
    value: function post(url, dado) {
      var _this2 = this;

      return fetch(url, {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(dado)
      }).then(function (res) {
        return _classPrivateMethodGet(_this2, _handleErrors, _handleErrors2).call(_this2, res);
      });
    }
  }]);

  return HttpService;
}();

exports.HttpService = HttpService;

function _handleErrors2(res) {
  if (!res.ok) throw new Error(res.statusText);
  return res;
}
//# sourceMappingURL=HttpService.js.map