class Negociacao {

    constructor(data, quantidade, valor){

        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        
        Object.freeze(this); // torna a instância imutável
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());  // protegendo este get para não sofrer alterações por referência.
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }
}