"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegociacaoDao = void 0;

var _Negociacao = require("../models/Negociacao.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _connection = /*#__PURE__*/new WeakMap();

var _store = /*#__PURE__*/new WeakMap();

var NegociacaoDao = /*#__PURE__*/function () {
  function NegociacaoDao(connection) {
    _classCallCheck(this, NegociacaoDao);

    _classPrivateFieldInitSpec(this, _connection, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _store, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _connection, connection);

    _classPrivateFieldSet(this, _store, 'negociacoes');
  }

  _createClass(NegociacaoDao, [{
    key: "adiciona",
    value: function adiciona(negociacao) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = _classPrivateFieldGet(_this, _connection).transaction([_classPrivateFieldGet(_this, _store)], 'readwrite').objectStore(_classPrivateFieldGet(_this, _store)).add(negociacao);

        request.onsuccess = function (e) {
          return resolve();
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível adicionar a negociação');
        };
      });
    }
  }, {
    key: "listaTodos",
    value: function listaTodos() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var cursor = _classPrivateFieldGet(_this2, _connection).transaction([_classPrivateFieldGet(_this2, _store)], "readwrite").objectStore(_classPrivateFieldGet(_this2, _store)).openCursor();

        var negociacoes = [];

        cursor.onsuccess = function (e) {
          var atual = e.target.result;

          if (atual) {
            var dado = atual.value;
            negociacoes.push(new _Negociacao.Negociacao(dado._data, dado._quantidade, dado._valor));
            atual["continue"]();
          } else {
            resolve(negociacoes);
          }
        };

        cursor.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível listar as negociações');
        };
      });
    }
  }, {
    key: "apagaTodos",
    value: function apagaTodos() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = _classPrivateFieldGet(_this3, _connection).transaction([_classPrivateFieldGet(_this3, _store)], "readwrite").objectStore(_classPrivateFieldGet(_this3, _store)).clear();

        request.onsuccess = function (e) {
          return resolve('Negociações removidas com sucesso');
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível remover as negociações');
        };
      });
    }
  }]);

  return NegociacaoDao;
}();

exports.NegociacaoDao = NegociacaoDao;
//# sourceMappingURL=NegociacaoDao.js.map