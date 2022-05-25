export class DateHelper{

    constructor(){
        throw new Error('Você não pode criar uma instância dessa classe');
    }

    static #textoParaData(texto){
        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) 
            throw new Error('Deve estar no formato dd/mm/aaaa');
        return new Date(...texto.split('/').reverse().map((item,indice)=> item - indice % 2 ))
    }

    static #dataParaTexto(data){
        return `${('0' + data.getDate()).slice(-2)}/${('0' + (parseInt(data.getMonth())+1)).slice(-2)}/${data.getFullYear()}`
    } 

    static textoParaData(texto){
        return this.#textoParaData(texto)
    }

    static dataParaTexto(data){
        return this.#dataParaTexto(data)
    }
}