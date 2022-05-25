export class View{
    #elemento
    constructor(elemento){

        if(this.constructor === View) throw new Error("Classe View não pode ser instanciada diretamente");
        
        this.#elemento = elemento
    }

    template(model){
        throw new Error('Você deve sobrescrever este método em seu template')
    }

    update(model){
        this.#elemento.innerHTML = this.template(model)
    }
}