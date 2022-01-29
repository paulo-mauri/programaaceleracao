class NegociacaoController {

    constructor() {

        this._ordemAtual = ''; // quando a página for carregada, não tem critério. Só passa a ter quando ele começa a clicar nas colunas

        let $ = document.querySelector.bind(document); // bind o $ que equivale ao query selector faz uma referencia ao document..
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        // Usando o Reflection classe reflect.apply
        // this._listaNegociacoes = new ListaNegociacao(this, function(model){

        //     this._negociacoesView.update(model);
        // });

        // arrow function , o escopo do this do arrow functio é léxico, esta amarrado ao escopo da chamada
        // mantém o this ao momento de sua criação
        // this._listaNegociacoes = new ListaNegociacao(model => this._negociacoesView.update(model));

        this._listaNegociacoes = new Bind(
            new ListaNegociacao(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona','esvazia','ordena','inverteOrdem');

        // ProxyFactory.create(
        //     new ListaNegociacao(),
        //     ['adiciona','esvazia'],
        //     (model) => this._negociacoesView.update(model));

        this._mensagem = new Bind(new Mensagem(),
        new MensagemView($('#mensagemView')),
            'texto');

        // ProxyFactory.create(
        //     new Mensagem(),
        //     ['texto'], (model) => this._mensagemView.update(model));

    }

    adiciona(event){
        try
        {

            event.preventDefault();  // a função event.preventDefault(); serve para prevenir o comportamento padrão de um evento.

            // console.log(typeof(this._inputData.value));

            // let data = new Date(this._inputData.value.split('-'));
            // let data = new Date(this._inputData.value.replace(/-/g,','));

            // let data = new Date(...     // ... spread operator
            //     this._inputData.value
            //         .split('-')
            //         .map(function(item, indice) {
            //             // if(indice == 1) {
            //             //     return item - 1;
            //             // }
            //             return item - indice % 2;
            //         })
            //     );

            // let data = new Date(...     // ... spread operator
            //     this._inputData.value
            //             .split('-')
            //             .map((item, indice) => item - indice % 2)
            //     );

            // let helper = new DateHelper()
            // let data = helper.textoParaData(this._inputData.value);

            //console.log(data);

            // let negociacao = new Negociacao(
            //     data,
            //     this._inputQuantidade.value,
            //     this._inputValor.value
            // );

            // console.log(negociacao);

            // console.log(DateHelper.dataParaTexto(negociacao.data));

            // adicionar a negociação em uma lista
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            // this._listaNegociacoes.negociacoes.push(this._criaNegociacao()); // => exemplo de acesso a lista por referencia

            this._mensagem.texto = 'Negociação adicionada com sucesso';

            //this._mensagemView.update(this._mensagem);

            this._limpaFormulario();

            // this._listaNegociacoes.negociacoes.length = 0;

            console.log(this._listaNegociacoes.negociacoes);
        }
        catch(erro) {
            this._mensagem.texto = erro;
        }

    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        /*
        service.obterNegociacoesDaSemana((erro, negociacoes) => {
            
            if(erro) {
                this._mensagem.texto = erro;
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
            
            service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
            
                if(erro) {
                    this._mensagem.texto = erro;
                    return;
                }
    
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso';
                
                service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
            
                    if(erro) {
                        this._mensagem.texto = erro;
                        return;
                    }
        
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = 'Negociações importadas com sucesso';
                    
                });
            
            });

            
        });
        */

        // Padrão de Projeto Promise
        // service.obterNegociacoesDaSemana()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'Negociações da semana obtida com sucesso.';
        //     })
        //     .catch(erro => this._mensagem.texto = erro);

        // service.obterNegociacoesDaSemanaAnterior()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'Negociações da semana obtida com sucesso.';
        //     })
        //     .catch(erro => this._mensagem.texto = erro);

        // service.obterNegociacoesDaSemanaRetrasada()
        //     .then(negociacoes => {
        //         negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'Negociações da semana obtida com sucesso.';
        //     })
        //     .catch(erro => this._mensagem.texto = erro);

        Promise.all([
            service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaAnterior(),
            service.obterNegociacoesDaSemanaRetrasada()]
        )
        .then(negociacoes => {
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            
            this._mensagem.texto = 'Negociações importadas com sucesso';
            console.log(negociacoes);
        })
        .catch(error => this._mensagem.texto = error);

    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        //this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);    
        }
        this._ordemAtual = coluna;
    }
}