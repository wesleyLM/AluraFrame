"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListaNegociacoes = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ListaNegociacoes = /*#__PURE__*/function () {
  function ListaNegociacoes() {
    _classCallCheck(this, ListaNegociacoes);

    this._listaNegociacoes = [];
  }

  _createClass(ListaNegociacoes, [{
    key: "adiciona",
    value: function adiciona(negociacao) {
      this._listaNegociacoes.push(negociacao);
    }
  }, {
    key: "volumeTotal",
    get: function get() {
      return this._listaNegociacoes.reduce(function (total, n) {
        return total += n.volume;
      }, 0.0);
    }
  }, {
    key: "negociacao",
    get: function get() {
      return [].concat(this._listaNegociacoes);
    }
  }, {
    key: "apagar",
    value: function apagar() {
      this._listaNegociacoes = [];
    }
  }, {
    key: "ordenar",
    value: function ordenar(criterio) {
      this._listaNegociacoes.sort(criterio);
    }
  }, {
    key: "inverteOrdem",
    value: function inverteOrdem() {
      this._listaNegociacoes.reverse();
    }
  }]);

  return ListaNegociacoes;
}();

exports.ListaNegociacoes = ListaNegociacoes;
//# sourceMappingURL=ListaNegociacoes.js.map