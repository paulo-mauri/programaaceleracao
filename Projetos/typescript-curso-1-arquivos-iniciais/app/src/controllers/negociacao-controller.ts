import { NegociacoesDoDia } from './../interfaces/negociacao-do-dia.js';
import { MensagemView } from './../views/mensagem-view.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { Negociacao } from './../models/negociacao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
    @domInjector('#data')             // decorator de propriedade
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')       // decorator de propriedade
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')            // decorator de propriedade
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    // data.getDay()
    // 0 - 6 => 0 é Domingo , 6 é sábado
    // CONSTANTES
    //private readonly SABADO = 6;
    //private readonly DOMINGO = 0;
    private negociacaoService = new NegociacoesService();

    constructor() {
        // this.inputData = document.querySelector('#data') as HTMLInputElement;            //forma de cast  
        // this.inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade'); //forma de cast
        // this.inputValor = document.querySelector('#valor') as HTMLInputElement;          //forma de cast
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {

        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas em negociações em dias úteis são aceitas');
            return;
        }

        this.negociacoes.adiciona(negociacao);
        // console.log(`
        //     Data: ${negociacao.data},
        //     Quantidade: ${negociacao.quantidade},
        //     Valor: ${negociacao.valor} 
        // `);
        // console.log(JSON.stringify(this.negociacoes,null,2));

        //console.log(negociacao.paraTexto());
        //console.log(this.negociacoes.paraTexto());

        imprimir(negociacao, this.negociacoes);

        this.limpaFormulario();
        this.atualizaView();

    }

    importarDados(): void {
        this.negociacaoService
            .obterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacoesDeHoje => {
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                                            .ehIgual(negociacoesDeHoje)
                        );
                });
            })
            .then((negociacoesDeHoje) => {
                for(let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            })
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO;
    }

    private limpaFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}