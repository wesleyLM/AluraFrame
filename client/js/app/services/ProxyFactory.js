"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProxyFactory = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

var ProxyFactory = /*#__PURE__*/function () {
  function ProxyFactory() {
    _classCallCheck(this, ProxyFactory);

    throw new Error('Você não pode criar uma instância dessa classe');
  }

  _createClass(ProxyFactory, null, [{
    key: "create",
    value: function create(objeto, props, acao) {
      return new Proxy(objeto, {
        get: function get(target, prop, receiver) {
          if (props.includes(prop) && _classStaticPrivateMethodGet(ProxyFactory, ProxyFactory, _ehFuncao).call(ProxyFactory, target[prop])) {
            return function () {
              var retorno = Reflect.apply(target[prop], target, arguments);
              acao(target);
              return retorno;
            };
          }

          return Reflect.get(target, prop, receiver);
        },
        set: function set(target, prop, value, receiver) {
          var retorno = Reflect.set(target, prop, value, receiver);
          if (props.includes(prop)) acao(target); // só executa acao(target) se for uma propriedade monitorada

          return retorno;
        }
      });
    }
  }]);

  return ProxyFactory;
}();

exports.ProxyFactory = ProxyFactory;

function _ehFuncao(func) {
  return _typeof(func) === (typeof Function === "undefined" ? "undefined" : _typeof(Function));
}
//# sourceMappingURL=ProxyFactory.js.map