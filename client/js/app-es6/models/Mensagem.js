export class Mensagem{
    constructor(mensagem){
      this._texto = mensagem || "";  
    }
    
    set texto(mensagem){
        this._texto = mensagem
    }

    get texto(){
        return this._texto
    }

   
}