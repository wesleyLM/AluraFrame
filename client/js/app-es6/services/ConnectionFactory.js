const stores = ['negociacoes']
const version = 1;
const dbName = 'aluraframe';

var connection = null;
var close = null

export class ConnectionFactory{
    
    constructor() {
        throw new Error('Você não pode criar uma instância dessa classe');
    }

    static getConnection(){

        return new Promise((resolve,reject)=>{

            var openRequest = window.indexedDB.open(dbName, version)
    
            openRequest.onupgradeneeded = e => {
                ConnectionFactory.#createStores(e.target.result)
            }
    
            openRequest.onsuccess = e => {
                if(!connection) connection = e.target.result;
                close = connection.close.bind(connection);
                connection.close = function() {
                    throw new Error('A conexão não pode-se fechada diretamente')
                }
                resolve(connection)
            }
    
            openRequest.onerror = e => {                    
                console.log(e.target.error)

                reject(e.target.error.name)
            }
        })
    }

    static #createStores(connection){
        stores.forEach(store => {

            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);

            connection.createObjectStore(store, {autoIncrement: true});
        })
    }

    static closeConnection(){
        if(connection){
            close();
            connection = null;
        }
    }
}
