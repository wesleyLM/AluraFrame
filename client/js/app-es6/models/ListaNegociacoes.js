export class ListaNegociacoes {
    constructor() {
        this._listaNegociacoes = [];
    }

    adiciona(negociacao) {
        this._listaNegociacoes.push(negociacao);
    }


    get volumeTotal() {
        return this._listaNegociacoes.reduce((total, n) => total += n.volume, 0.0)
    }

    get negociacao() {
        return [].concat(this._listaNegociacoes);
    }

    apagar() {
        this._listaNegociacoes = []
    }

    ordenar(criterio) {
        this._listaNegociacoes.sort(criterio);
    }

    inverteOrdem() {
        this._listaNegociacoes.reverse();
    }



}