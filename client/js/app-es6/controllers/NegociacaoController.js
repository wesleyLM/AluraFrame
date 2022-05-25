import { Negociacao } from "../models/Negociacao.js";
import { NegociacaoService } from "../services/NegociacaoService.js";
import { Bind } from "../helpers/Bind.js";
import { ListaNegociacoes } from "../models/ListaNegociacoes.js";
import { NegociacoesView } from "../views/NegociacoesView.js";
import { MensagensView } from "../views/MensagensView.js";
import { Mensagem } from "../models/Mensagem.js";
import { DateHelper } from "../helpers/DateHelper.js";

class NegociacaoController {
    #inputData;
    #inputQuantidade;
    #inputValor;
    #form;
    #listaNegociacoes;
    #mensagem;
    #ordemAtual;
    #service;
    #table;

    constructor() {
        let $ = document.querySelector.bind(document);

        this.#form = $('.form');
        this.#inputData = $('#data');
        this.#inputQuantidade = $('#quantidade');
        this.#inputValor = $('#valor');
        this.#service = new NegociacaoService()

        this.#listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("[data-tabela]")),
            'adiciona', 'apagar', 'ordenar', 'inverteOrdem'
        )

        this.#mensagem = new Bind(
            new Mensagem(),
            new MensagensView($("[data-mensagem]")),
            'texto'
        )

        this.#ordemAtual = ''
        this.#table = $('[data-table]');

        this.#init()

    }

    #init(){

        this.#service
            .listar()
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                this.#listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this.#mensagem.texto = erro)

        
    
        setInterval(()=>{
            this.#importaNegociacoes()
            this.#table.addEventListener('click',e => {
                if(e.target.nodeName == "TH"){
                    this.ordena(e.target.textContent.toLowerCase())
                }
            })
        },3000)
        
        
    }

    adiciona(evento) {
        evento.preventDefault();

        let negociacao = this.#criarNegociacao();

        this.#service
            .cadastrar(negociacao)
            .then(mensagem =>{
    
                this.#listaNegociacoes.adiciona(negociacao)
                this.#limpaCampo();
                this.#mensagem.texto = mensagem
            })
            .catch(erro => this.#mensagem.texto = erro)
    }

    #criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this.#inputData.value), 
            parseInt(this.#inputQuantidade.value),
            parseFloat(this.#inputValor.value))
    }

    #importaNegociacoes() {
        this.#service
            .importar(this.#listaNegociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this.#listaNegociacoes.adiciona(negociacao))
                        
                this.#mensagem.texto = "Negociações importadas com sucesso"
            }) 
            .catch(erro => this.#mensagem.texto = erro);
    }

    limpaTabela() {

        this.#service
            .apagar()
            .then(mensagem =>{ 
                this.#listaNegociacoes.apagar()
    
                this.#mensagem.texto = mensagem
            })
            .catch(erro => this.#mensagem.texto = erro)  
    }

    #limpaCampo() {
        this.#form.reset();
        this.#inputData.focus();
    }

    ordena(coluna) {
        if (this.#ordemAtual == coluna) {
            this.#listaNegociacoes.inverteOrdem()
        } else {
            this.#listaNegociacoes.ordenar((a, b) => a[coluna] - b[coluna]);
        }
        this.#ordemAtual = coluna;
    }

}

let negociacaoController = new NegociacaoController();

export function currentInstanced() {
    return negociacaoController;
}