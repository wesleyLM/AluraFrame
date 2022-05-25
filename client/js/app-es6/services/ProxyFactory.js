export class ProxyFactory {
    constructor() {
        throw new Error('Você não pode criar uma instância dessa classe');
    }

    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory.#ehFuncao(target[prop])) {
                    return function () {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) acao(target);    // só executa acao(target) se for uma propriedade monitorada
                return retorno;
            }
        });
    }

    static #ehFuncao(func) {
        return typeof (func) === typeof (Function);
    }
}