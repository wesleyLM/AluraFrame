"use strict";

var _NegociacaoController = require("./controllers/NegociacaoController.js");

require("./polyfill/fetch.js");

var negociacaoController = (0, _NegociacaoController.currentInstanced)();
var $ = document.querySelector.bind(document);
$('.form').addEventListener('submit', function (evento) {
  return negociacaoController.adiciona(evento);
});
$('[data-btnApagar]').addEventListener('click', function () {
  return negociacaoController.limpaTabela();
});
//# sourceMappingURL=main.js.map