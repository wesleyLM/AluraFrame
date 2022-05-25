"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionFactory = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

var stores = ['negociacoes'];
var version = 1;
var dbName = 'aluraframe';
var connection = null;
var close = null;

var ConnectionFactory = /*#__PURE__*/function () {
  function ConnectionFactory() {
    _classCallCheck(this, ConnectionFactory);

    throw new Error('Você não pode criar uma instância dessa classe');
  }

  _createClass(ConnectionFactory, null, [{
    key: "getConnection",
    value: function getConnection() {
      return new Promise(function (resolve, reject) {
        var openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = function (e) {
          _classStaticPrivateMethodGet(ConnectionFactory, ConnectionFactory, _createStores).call(ConnectionFactory, e.target.result);
        };

        openRequest.onsuccess = function (e) {
          if (!connection) connection = e.target.result;
          close = connection.close.bind(connection);

          connection.close = function () {
            throw new Error('A conexão não pode-se fechada diretamente');
          };

          resolve(connection);
        };

        openRequest.onerror = function (e) {
          console.log(e.target.error);
          reject(e.target.error.name);
        };
      });
    }
  }, {
    key: "closeConnection",
    value: function closeConnection() {
      if (connection) {
        close();
        connection = null;
      }
    }
  }]);

  return ConnectionFactory;
}();

exports.ConnectionFactory = ConnectionFactory;

function _createStores(connection) {
  stores.forEach(function (store) {
    if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
    connection.createObjectStore(store, {
      autoIncrement: true
    });
  });
}
//# sourceMappingURL=ConnectionFactory.js.map