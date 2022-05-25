import { currentInstanced } from "./controllers/NegociacaoController.js";
import {  } from "./polyfill/fetch.js";
var negociacaoController = currentInstanced();

let $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', evento => negociacaoController.adiciona(evento));

$('[data-btnApagar]').addEventListener('click',() => negociacaoController.limpaTabela());

