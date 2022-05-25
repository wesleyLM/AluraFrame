"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegociacaoService = void 0;

var _HttpService = require("./HttpService.js");

var _Negociacao = require("../models/Negociacao.js");

var _ConnectionFactory = require("./ConnectionFactory.js");

var _NegociacaoDao = require("../dao/NegociacaoDao.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _http = /*#__PURE__*/new WeakMap();

var _obterNegociacoesDaSemana = /*#__PURE__*/new WeakSet();

var _obterNegociacoesDaSemanaAnterior = /*#__PURE__*/new WeakSet();

var _obterNegociacoesDaSemanaRetrasada = /*#__PURE__*/new WeakSet();

var _obterNegociacoes = /*#__PURE__*/new WeakSet();

var NegociacaoService = /*#__PURE__*/function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    _classPrivateMethodInitSpec(this, _obterNegociacoes);

    _classPrivateMethodInitSpec(this, _obterNegociacoesDaSemanaRetrasada);

    _classPrivateMethodInitSpec(this, _obterNegociacoesDaSemanaAnterior);

    _classPrivateMethodInitSpec(this, _obterNegociacoesDaSemana);

    _classPrivateFieldInitSpec(this, _http, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _http, new _HttpService.HttpService());
  }

  _createClass(NegociacaoService, [{
    key: "cadastrar",
    value: function cadastrar(negociacao) {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao).then(function () {
          return 'Negociação adicionada com Sucesso';
        });
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação');
      });
    }
  }, {
    key: "importar",
    value: function importar(negociacoesLista) {
      return _classPrivateMethodGet(this, _obterNegociacoes, _obterNegociacoes2).call(this).then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !negociacoesLista.negociacao.some(function (listaNegociacoes) {
            return negociacao.isEquals(listaNegociacoes);
          });
        });
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível importar as negociação');
      });
    }
  }, {
    key: "apagar",
    value: function apagar() {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection).apagaTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso';
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações');
      });
    }
  }, {
    key: "listar",
    value: function listar() {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      })["catch"](function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações');
      });
    }
  }]);

  return NegociacaoService;
}();

exports.NegociacaoService = NegociacaoService;

function _obterNegociacoesDaSemana2() {
  return _classPrivateFieldGet(this, _http).get('negociacoes/semana').then(function (negociacoes) {
    return negociacoes.map(function (obj) {
      return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade || obj.qtd, obj.valor);
    });
  })["catch"](function (erro) {
    console.log(erro);
    throw new Error('Não foi possível obter as negociações da semana');
  });
}

function _obterNegociacoesDaSemanaAnterior2() {
  return _classPrivateFieldGet(this, _http).get('negociacoes/anterior').then(function (negociacoes) {
    return negociacoes.map(function (obj) {
      return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
    });
  })["catch"](function (erro) {
    console.log(erro);
    throw new Error('Não foi possível obter as negociações da semana anterior');
  });
}

function _obterNegociacoesDaSemanaRetrasada2() {
  return _classPrivateFieldGet(this, _http).get('negociacoes/retrasada').then(function (negociacoes) {
    return negociacoes.map(function (obj) {
      return new _Negociacao.Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
    });
  })["catch"](function (erro) {
    console.log(erro);
    throw new Error('Não foi possível obter as negociações da semana retrasada');
  });
}

function _obterNegociacoes2() {
  return Promise.all([_classPrivateMethodGet(this, _obterNegociacoesDaSemana, _obterNegociacoesDaSemana2).call(this), _classPrivateMethodGet(this, _obterNegociacoesDaSemanaAnterior, _obterNegociacoesDaSemanaAnterior2).call(this), _classPrivateMethodGet(this, _obterNegociacoesDaSemanaRetrasada, _obterNegociacoesDaSemanaRetrasada2).call(this)]).then(function (periodos) {
    var negociacoes = periodos.reduce(function (arrayAchatado, array) {
      return arrayAchatado.concat(array);
    }, []);
    return negociacoes;
  })["catch"](function (erro) {
    throw new Error(erro);
  });
}
//# sourceMappingURL=NegociacaoService.js.map