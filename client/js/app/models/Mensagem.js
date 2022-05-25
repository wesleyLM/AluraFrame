"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mensagem = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Mensagem = /*#__PURE__*/function () {
  function Mensagem(mensagem) {
    _classCallCheck(this, Mensagem);

    this._texto = mensagem || "";
  }

  _createClass(Mensagem, [{
    key: "texto",
    get: function get() {
      return this._texto;
    },
    set: function set(mensagem) {
      this._texto = mensagem;
    }
  }]);

  return Mensagem;
}();

exports.Mensagem = Mensagem;
//# sourceMappingURL=Mensagem.js.map