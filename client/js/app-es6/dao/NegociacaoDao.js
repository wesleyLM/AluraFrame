import { Negociacao } from "../models/Negociacao.js";
export class NegociacaoDao{
    #connection;
    #store;
    constructor(connection){
        this.#connection = connection;
        this.#store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve, reject)=>{
            let request = this.#connection
                .transaction([this.#store], 'readwrite')
                    .objectStore(this.#store)
                        .add(negociacao);

            request.onsuccess = e => resolve();

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            }
        })
    }

    listaTodos(){

        return new Promise((resolve, reject)=>{

            let cursor = this.#connection
                .transaction([this.#store],"readwrite")
                    .objectStore(this.#store)
                        .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));

                    atual.continue();

                } else {
                    resolve(negociacoes)
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações');
            }
        })
        
    }

    apagaTodos(){
        return new Promise((resolve,reject) => {
            let request = this.#connection
                .transaction([this.#store],"readwrite")
                    .objectStore(this.#store)
                        .clear()
            
            request.onsuccess = e => resolve('Negociações removidas com sucesso');

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível remover as negociações')
            };
        })
    }
}