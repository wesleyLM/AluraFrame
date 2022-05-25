"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegociacoesView = void 0;

var _View2 = require("./View.js");

var _DateHelper = require("../helpers/DateHelper.js");

var _NegociacaoController = require("../controllers/NegociacaoController.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NegociacoesView = /*#__PURE__*/function (_View) {
  _inherits(NegociacoesView, _View);

  var _super = _createSuper(NegociacoesView);

  function NegociacoesView(elemento) {
    var _this;

    _classCallCheck(this, NegociacoesView);

    _this = _super.call(this, elemento);
    elemento.addEventListener('click', function (e) {
      if (e.target.nodeName == "TH") {
        (0, _NegociacaoController.currentInstanced)().ordena(e.target.textContent.toLowerCase());
      }
    });
    return _this;
  }

  _createClass(NegociacoesView, [{
    key: "template",
    value: function template(model) {
      return "\n        <table class=\"table table-hover table-bordered\" data-table>\n            <thead>\n                <tr>\n                    <th>DATA</th>\n                    <th>QUANTIDADE</th>\n                    <th>VALOR</th>\n                    <th>VOLUME</th>\n                </tr>\n            </thead>\n            \n            <tbody>\n                ".concat(model.negociacao.map(function (n) {
        return "\n                    <tr>\n                        <td>".concat(_DateHelper.DateHelper.dataParaTexto(n.data), "</td>\n                        <td>").concat(n.quantidade, "</td>\n                        <td>").concat(n.valor, "</td>\n                        <td>").concat(n.volume, "</td>\n                    </tr>\n                ");
      }).join(" "), "\n            </tbody>\n                    <td colspan=\"3\">Total:</td>\n                    <td>").concat(model.volumeTotal, "</td>\n            <tfoot>\n            </tfoot>\n        </table>\n    ");
    }
  }]);

  return NegociacoesView;
}(_View2.View);

exports.NegociacoesView = NegociacoesView;
//# sourceMappingURL=NegociacoesView.js.map