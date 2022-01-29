class ListaNegociacao {

     // Usando o Reflection classe reflect.apply
    // constructor(contexto, armadilha) {

    //     this._negociacoes = [];
    //     this._armadilha = armadilha;
    //     this._contexto = contexto;
    // }

    // constructor(armadilha) {

    //     this._negociacoes = [];
    //     this._armadilha = armadilha;
    // }

    constructor() {

        this._negociacoes = [];
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        //this._armadilha(this);

        //Reflect.apply(this._armadilha, this._contexto, [this]); // Api de Reflection do javascript
    }

    get negociacoes () {
        return [].concat(this._negociacoes); // retorna um novo objeto array com os dados da lista negociação (uma cópia da original).
    }

    esvazia() {
        this._negociacoes = [];
        //this._armadilha(this);
        
        //Reflect.apply(this._armadilha, this._contexto, [this]); // Api de Reflection do javascript
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }
}