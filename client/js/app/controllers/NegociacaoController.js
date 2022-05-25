"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentInstanced = currentInstanced;

var _Negociacao = require("../models/Negociacao.js");

var _NegociacaoService = require("../services/NegociacaoService.js");

var _Bind = require("../helpers/Bind.js");

var _ListaNegociacoes = require("../models/ListaNegociacoes.js");

var _NegociacoesView = require("../views/NegociacoesView.js");

var _MensagensView = require("../views/MensagensView.js");

var _Mensagem = require("../models/Mensagem.js");

var _DateHelper = require("../helpers/DateHelper.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _inputData = /*#__PURE__*/new WeakMap();

var _inputQuantidade = /*#__PURE__*/new WeakMap();

var _inputValor = /*#__PURE__*/new WeakMap();

var _form = /*#__PURE__*/new WeakMap();

var _listaNegociacoes = /*#__PURE__*/new WeakMap();

var _mensagem = /*#__PURE__*/new WeakMap();

var _ordemAtual = /*#__PURE__*/new WeakMap();

var _service = /*#__PURE__*/new WeakMap();

var _table = /*#__PURE__*/new WeakMap();

var _init = /*#__PURE__*/new WeakSet();

var _criarNegociacao = /*#__PURE__*/new WeakSet();

var _importaNegociacoes = /*#__PURE__*/new WeakSet();

var _limpaCampo = /*#__PURE__*/new WeakSet();

var NegociacaoController = /*#__PURE__*/function () {
  function NegociacaoController() {
    _classCallCheck(this, NegociacaoController);

    _classPrivateMethodInitSpec(this, _limpaCampo);

    _classPrivateMethodInitSpec(this, _importaNegociacoes);

    _classPrivateMethodInitSpec(this, _criarNegociacao);

    _classPrivateMethodInitSpec(this, _init);

    _classPrivateFieldInitSpec(this, _inputData, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _inputQuantidade, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _inputValor, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _form, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _listaNegociacoes, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _mensagem, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _ordemAtual, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _service, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _table, {
      writable: true,
      value: void 0
    });

    var $ = document.querySelector.bind(document);

    _classPrivateFieldSet(this, _form, $('.form'));

    _classPrivateFieldSet(this, _inputData, $('#data'));

    _classPrivateFieldSet(this, _inputQuantidade, $('#quantidade'));

    _classPrivateFieldSet(this, _inputValor, $('#valor'));

    _classPrivateFieldSet(this, _service, new _NegociacaoService.NegociacaoService());

    _classPrivateFieldSet(this, _listaNegociacoes, new _Bind.Bind(new _ListaNegociacoes.ListaNegociacoes(), new _NegociacoesView.NegociacoesView($("[data-tabela]")), 'adiciona', 'apagar', 'ordenar', 'inverteOrdem'));

    _classPrivateFieldSet(this, _mensagem, new _Bind.Bind(new _Mensagem.Mensagem(), new _MensagensView.MensagensView($("[data-mensagem]")), 'texto'));

    _classPrivateFieldSet(this, _ordemAtual, '');

    _classPrivateFieldSet(this, _table, $('[data-table]'));

    _classPrivateMethodGet(this, _init, _init2).call(this);
  }

  _createClass(NegociacaoController, [{
    key: "adiciona",
    value: function adiciona(evento) {
      var _this = this;

      evento.preventDefault();

      var negociacao = _classPrivateMethodGet(this, _criarNegociacao, _criarNegociacao2).call(this);

      _classPrivateFieldGet(this, _service).cadastrar(negociacao).then(function (mensagem) {
        _classPrivateFieldGet(_this, _listaNegociacoes).adiciona(negociacao);

        _classPrivateMethodGet(_this, _limpaCampo, _limpaCampo2).call(_this);

        _classPrivateFieldGet(_this, _mensagem).texto = mensagem;
      })["catch"](function (erro) {
        return _classPrivateFieldGet(_this, _mensagem).texto = erro;
      });
    }
  }, {
    key: "limpaTabela",
    value: function limpaTabela() {
      var _this2 = this;

      _classPrivateFieldGet(this, _service).apagar().then(function (mensagem) {
        _classPrivateFieldGet(_this2, _listaNegociacoes).apagar();

        _classPrivateFieldGet(_this2, _mensagem).texto = mensagem;
      })["catch"](function (erro) {
        return _classPrivateFieldGet(_this2, _mensagem).texto = erro;
      });
    }
  }, {
    key: "ordena",
    value: function ordena(coluna) {
      if (_classPrivateFieldGet(this, _ordemAtual) == coluna) {
        _classPrivateFieldGet(this, _listaNegociacoes).inverteOrdem();
      } else {
        _classPrivateFieldGet(this, _listaNegociacoes).ordenar(function (a, b) {
          return a[coluna] - b[coluna];
        });
      }

      _classPrivateFieldSet(this, _ordemAtual, coluna);
    }
  }]);

  return NegociacaoController;
}();

function _init2() {
  var _this3 = this;

  _classPrivateFieldGet(this, _service).listar().then(function (negociacoes) {
    return negociacoes.forEach(function (negociacao) {
      return _classPrivateFieldGet(_this3, _listaNegociacoes).adiciona(negociacao);
    });
  })["catch"](function (erro) {
    return _classPrivateFieldGet(_this3, _mensagem).texto = erro;
  });

  setInterval(function () {
    _classPrivateMethodGet(_this3, _importaNegociacoes, _importaNegociacoes2).call(_this3);

    _classPrivateFieldGet(_this3, _table).addEventListener('click', function (e) {
      if (e.target.nodeName == "TH") {
        _this3.ordena(e.target.textContent.toLowerCase());
      }
    });
  }, 3000);
}

function _criarNegociacao2() {
  return new _Negociacao.Negociacao(_DateHelper.DateHelper.textoParaData(_classPrivateFieldGet(this, _inputData).value), parseInt(_classPrivateFieldGet(this, _inputQuantidade).value), parseFloat(_classPrivateFieldGet(this, _inputValor).value));
}

function _importaNegociacoes2() {
  var _this4 = this;

  _classPrivateFieldGet(this, _service).importar(_classPrivateFieldGet(this, _listaNegociacoes)).then(function (negociacoes) {
    negociacoes.forEach(function (negociacao) {
      return _classPrivateFieldGet(_this4, _listaNegociacoes).adiciona(negociacao);
    });
    _classPrivateFieldGet(_this4, _mensagem).texto = "Negociações importadas com sucesso";
  })["catch"](function (erro) {
    return _classPrivateFieldGet(_this4, _mensagem).texto = erro;
  });
}

function _limpaCampo2() {
  _classPrivateFieldGet(this, _form).reset();

  _classPrivateFieldGet(this, _inputData).focus();
}

var negociacaoController = new NegociacaoController();

function currentInstanced() {
  return negociacaoController;
}
//# sourceMappingURL=NegociacaoController.js.map