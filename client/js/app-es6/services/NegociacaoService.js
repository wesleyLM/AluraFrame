import { HttpService } from "./HttpService.js";
import { Negociacao } from "../models/Negociacao.js";
import { ConnectionFactory } from "./ConnectionFactory.js";
import { NegociacaoDao } from "../dao/NegociacaoDao.js";

export class NegociacaoService {
    #http;
    constructor() {
        this.#http = new HttpService();
    }

    #obterNegociacoesDaSemana() {

        return this.#http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade || obj.qtd, obj.valor
                ))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da semana')
            })
    }

    #obterNegociacoesDaSemanaAnterior() {

        return this.#http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor
                ))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da semana anterior')
            })
    }

    #obterNegociacoesDaSemanaRetrasada() {

        return this.#http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor
                ))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações da semana retrasada')
            })
    }

    #obterNegociacoes() {

        return Promise.all([
            this.#obterNegociacoesDaSemana(),
            this.#obterNegociacoesDaSemanaAnterior(),
            this.#obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);

            return negociacoes
        })
            .catch(erro => { throw new Error(erro) });
    }

    cadastrar(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao)
                .then(() => 'Negociação adicionada com Sucesso'))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível adicionar a negociação')
            })
    }

    importar(negociacoesLista) {

        return this.#obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !negociacoesLista.negociacao.some(listaNegociacoes => negociacao.isEquals(listaNegociacoes))))
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível importar as negociação')
            })

    }

    apagar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection).apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível apagar as negociações')
            })
    }

    listar() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível obter as negociações')
            })
    }
}