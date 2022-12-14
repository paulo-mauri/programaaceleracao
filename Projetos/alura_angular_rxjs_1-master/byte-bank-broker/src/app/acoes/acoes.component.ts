import { merge, Observable, Subscription } from 'rxjs';
import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent  {
  acoesInput = new FormControl();
  //acoes: Acoes;
  //private subscription: Subscription;

  // esse observable está no evento de inicialização do componente.. depois ele morre..
  todasAcoes$ = this.acoesService
                      .getAcoes()
                      .pipe(tap(() => console.log ('Fluxo inicial')));

  filtroPeloImput$ = this.acoesInput
                          .valueChanges
                          .pipe(
                            debounceTime(ESPERA_DIGITACAO),   // aguarda 300 milisegundos para liberar o fluxo
                            tap(() => {
                              console.log('Fluxo do filtro')
                            }),
                            tap(console.log),
                            filter((valorDigitado) => { return valorDigitado.length >=3 || !valorDigitado.length }), // passe para o switchMap valorDigitado maior ou igual a 3
                                                                                                                     // ou valor vazio.
                            distinctUntilChanged(),
                            switchMap((valorDigitado) => {
                              return this.acoesService.getAcoes(valorDigitado)
                            })
                          );

  //acoes$ = this.acoesService.getAcoes();
  // acoes$ = this.acoesInput
  //               .valueChanges
  //               .pipe(
  //                      tap(console.log),
  //                      switchMap((valorDigitado) => { return this.acoesService.getAcoes(valorDigitado) } ),
  //                      tap(console.log)
  //                   );

  acoes$ = merge(this.todasAcoes$, this.filtroPeloImput$);

  // É possível usar o operador "startWith" do RxJs invés do merge,
  // isso faz com que o valueChanges tenha um valor inicial e a busca é realizada. Segue abaixo a alternativa:
  acoes$$: Observable<Acoes> = this.acoesInput.valueChanges
                                              .pipe(
                                                startWith('')
                                              )
                                              .pipe(
                                                switchMap((valorDigitado: string) =>
                                                  this.acoesService.getAcoes(valorDigitado)
                                                )
                                              );




  constructor(private acoesService: AcoesService) {}

  //ngOnInit(): void {
    // this.subscription = this.acoesService
    // .getAcoes()
    // .subscribe((acoes: Acoes) => {
    //   this.acoes = acoes;
    // })
  //}

  //ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  //}
}

/*
  SUBSCRIPTION

  00:00] Antes de voltarmos para o nosso componente, é sempre uma boa prática aproveitarmos uma das melhores vantagens do TypeScript, que é a tipagem dos métodos, variáveis e funções.

  [00:09] Vamos no serviço, no arquivo “acoes.service.tse” e alterar a chamada do serviço httpClient do Angular. Ao invés de chamar o <any>, eu vou colocar <AcoesAPI>. Se o seu IDE não importar, ele está em ’./modelo/acoes’.

  [00:29] E podemos notar uma coisa muito interessante. O método httpClient service está retornando um objeto do tipo acoesAPI. Porém, se viermos no getAcoes e colocarmos a seta do mouse em cima, podemos notar que ele está retornando um Observable de Ações. E por que isso acontece?

  [00:52] Isso acontece porque a biblioteca RxJS é escrita em TypeScript e como podemos notar no último map, o resultado final das manipulações do operador é um objeto do tipo Ações.

  [01:05] Agora, com o nosso serviço devidamente tipado, vamos voltar para o componente no arquivo “acoes.component.ts”. Para pegar as ações fazemos o subscribe do Observable no método ciclo de vida ngOnInit(). No caso do serviço HTTP, assim que a requisição é entregue o Observable termina o fluxo e sai da memória do componente.

  [01:30] Porém, vamos usar mais Observables aqui e existem Observables que apresentam fluxo contínuo e, caso não fechemos os Observables de forma correta, o seu front-end poderá apresentar vazamentos de memória, prejudicando a experiência do usuário.

  [01:45] Mas, como vamos fechar o Observable? Nós utilizamos o método Unsubscribe. E aonde podemos chamar esse método? Em outro método de ciclo de vida, o ngOnDestroy(). Então, no nosso componente, primeiro vamos criar um atributo private que vai representar a subscription realizada pelo método Subscribe.

  [02:10] private subscription:Subscription. E vamos guardar essa Subscription no momento que ele faz o subscribe no ngOnInit.

  [02:36] No ngOnInit eu colocar this.subscription = à Subscription que estava sendo feita nele. Podemos notar que o método subscribe() retorna uma Subscription.

  [02:55] No começo da implementação da nossa classe, em export class AcoesComponent implements OnInit vamos acrescentar, vírgula e a interface OnDestroy.

  [03:13] E, embaixo do ngOnInit() vamos criar o método ngOnDestroy(). O que esse método vai fazer? Ele vai chamar a this.subscription.unsubscribe. Assim, garantimos que a subscrição que fizemos no ngOnInit() seja corretamente finalizada quando o componente sair da memória.

*/

/*
  PIPE ASYNC

  [00:00] Estudamos qual é a boa prática para a manipulação do Observable no componente. Porém, essa situação é tão comum que o time do Angular preparou uma funcionalidade só para isso, o pipe async.

  [00:12] Vamos refatorar o nosso código para usá-lo. Primeiro, vamos ao nosso template em “acoes.component.html” e vamos fazer a seguinte alteração: no *ngIf, ao invés de ”acoes” vamos colocar acoes$, o símbolo do pipe(|), | async as acoes. Nem precisamos mudar o ngFor porque ngIf é as acoes.

  [00:59] Esse sinal de dólar na frente da variável é uma convenção da comunidade e indica que essa variável é um Observable. E é muito comum, mas, não é obrigatório.

  [01:08] O foco nosso nesse código é o pipe async (| async). Com essa instrução, o Angular irá se inscrever nesse Observable, passar o seu conteúdo para a variável Ações e quando o componente for encerrado, o framework cuida para fazer o Unsubscribe do Observable. Ele cuida de tudo para nós, sozinho.

  [01:29] Então, fica simples o nosso TypeScript. Vamos voltar em “acoes.component.ts”, vamos apagar o atributo acoes: Acoes, vamos apagar a subscription private subscription: Subscription; e embaixo do meu Input, do meu controle de formulário Input vamos criar acoes$ = e, em seguida, vamos chamar o this.acoesService.getAcoes.

  [02:26] Porque o getAcoes retorna um Observable do tipo Ações. Então, acoes$ não é mais o array, o estado final da API, e sim o Observable de Ações.

  [02:37] Com isso, podemos apagar o nosso método ngOnInit() e apagar o nosso ngOnDestroy() e também apagar o implements ng OnInit ngOnDestroy. Vamos executar o nosso front-end, eu já deixei ele executado, então ele vai pegando os erros, mas, no final ele retorunou: "Compiled successfully".

  [03:08] Se eu vir no meu Byte Bank Broker, no meu navegador, podemos ver que continua funcionando. Abrindo o nosso console nenhum erro ocorreu. Vou fechar o console.

  [03:27] Um coisa importante para frisarmos é que o Observable tem a sua iniciação lazy, preguiçosa. Ou seja, o Angular vai saber exatamente quando se conectar à nossa API. Então, na declaração export class, no Visual Studio Code, no ponto acoes$ = this.acoesService.getAcoes não fizemos nenhuma requisição à nossa API.

  [03:55] Essa requisição só foi feita no momento que o nosso componente abriu-se, se inicializou, e o pipe async fez o subscribe. E, aí, nesse momento subscribe que acontece a requisição API.

  [04:10] O código ficou show. E agora, vamos entender o que o operador map faz com o auxílio de uma ferramenta muito legal, o Gráfico de Marbles.
*/

/* SWITCH MAP

    [00:00] A nossa tela está apresentando esse erro "Cannot find a differ supporting object 'a' of type 'string'. NgFor only supports binding to Iterables such as Arrays". Isso acontece porque o ngFor do arquivo de templates não está mais recebendo o array de ações para mostrar. E agora, temos o desafio de pegar essas informações da nossa API filtrando pela digitação do nosso usuário.

    [00:17] Primeiro, vamos alterar o nosso serviço , então, no IDE vamos vir em “acoes.service.ts” para receber a expressão do filtro, as informações que vierem do meu campo Input.

    [00:31] Vamos no método getAcoes() e vamos incluir o parâmetro (valor). Esse parâmetro vai ser opcional, então, digito ponto de interrogação, dois pontos, ?: string, porque vai ser do tipo string, estou indicando para o TypeScript que ele vai ser opcional e quando ele vier, ele virá do tipo string.

    [00:58] Com esse parâmetro vamos passar para o httpClient, para ele buscar essas informações na nossa API. Para não ter que fazer interpolação, vamos usar o objeto HTTP Reader do Angular. Então, ainda no método getAcoes(), antes do nosso return, vamos criar uma variável const params = valor, se tiver valor; vamos fazer um operador ternário; se tiver valor eu quero que o params seja um new HttpParams, então, ele é uma classe.

    [01:50] E já vou setar ele, vou colocar um .append(‘’). Lá na minha API ele está esperando Query Param com o nome de valor, então, vou colocar entre aspas (‘valor’) que é o nome da minha Query Param lá da minha API. E qual o atributo que eu vou atribuir à essa Query String? O valor, que vai vir do meu método.

    [02:20] Se não tiver valor, então, params vai ser undefined, porque ele vai fazer a busca por todos, como ele fazia. No nosso httpClient o primeiro parâmetro é o caminho onde ele vai fazer a busca, onde ele vai fazer o get. O segundo parâmetro é um objeto que você pode passar várias opções, entre elas os parâmetro, então, {params}.

    [02:50] Como eu estou usando o mesmo nome do método, eu criei uma variável com o mesmo nome do atributo do objeto, eu não preciso colocar {params:params}, eu posso economizar e colocar só {params}.

    [03:09] Voltando ao componente, em “acoes.component.ts”, temos que ter um jeito de alternar o fluxo de dados vindos do evento da digitação, para o fluxo de dados da requisição do HTTP para o async pipe fazer o subscribe e, aí sim, pegar as ações e não a string que o usuário digitou.

    [03:31] Para esse controle de ação do fluxo e não dos dados, nós não vamos utilizar o map, como estudamos anteriormente. Vamos utilizar um novo operador, o switchMap. Desse jeito. Em acoes$, no Observable que o acompanha, vou continuar com o tap, vou colocar vírgula e vou chamar a função do operador switchMap.

    [04:00] Esse switchMap, ele espera uma função, onde ele vai enviar para essa função interna; então, vou começar uma arrow function; ele vai passar o (valor) que está vindo do pipe; lembre-se do Observable, é um cano, então, nesse caso, é o valor de digitação que está vindo; então, vou colocar a informação (valorDigitado), sinal de igual e maior (=>), porque é uma arrow function.

    [04:33] E o que acontece? O switchMap espera como retorno outro Observable, porque o que estamos fazendo? Estamos trocando o fluxo. Então, nesse caso eu vou retornar o Observable this.acoesService, que estava anteriormente .getAcoes e dessa vez vamos colocar o (valorDigitado). Vou salvar, o Prettier vai reformatar para ficar mais visível.

    [05:08] Então, switchMap e eu vou criar uma função onde recebe o (valorDigitado) e ele tem como retorno o Observable que o meu serviço getAcoes está criando e passando o (valorDigitado). E depois eu vou colocar mais um tap para notarmos o que ele está retornando, qual que é o valor que está vindo agora, depois deste switchMap.

    [05:48] O switchMap recebe de novo, como eu falei, como parâmetro os dados do fluxo anterior e retorna um novo Observable.

    [06:57] De volta à nossa tela no Byte Bank Broker, podemos notar que não aparecem ações, mas, no momento que eu começar a digitar ele já está retornando as ações e, melhor, filtrado. Então, no caso, se digitar "Alura" ele já retorna as duas ações da Alura.

    [06:16] E se notarmos no nosso console log, toda vez que digitamos ele vai fazer uma busca e trazer um Observable novo, trazer todo mundo que tem a letra “A”. Esse filtro é feito na nossa API.

    [06:28] Só que o que acontece? Aconteceu um efeito colateral. Porque se eu apago - vou colocar os valores e ele está aparecendo - e se eu apago, aparecem todas as ações. Só que se eu recarregar a página; vou vir em recarregar a página, clicando no botão de “Recarregar” do browser, no canto esquerdo superior da tela, está aparecendo “Não há dados”. Aconteceu esse efeito colateral.

*/

/*
  MERGE

    [00:00] No navegador, analisando o Console log, podemos notar que quando a tela é recarregada o Observable não é acionado, então, a informação não passa pelo pipe e nenhum dado é carregado na tela. Então, devemos dar um jeito nisso.

    [00:15] Primeiro, vamos criar um atributo novo no nosso componente, em “acoes.component.ts”, que vai representar o fluxo inicial, onde virão todas as ações.

    [00:33] Então, eu vou criar um atributo da minha classe AcoesComponent, vou dar o nome de todasAcoes$, ele vai ser um Observable, então, coloquei o sinal de dólar, que é a convenção que usamos, = this.acoesService.getAcoes, sem passar nenhum parâmetro, porque o atributo representa todas as ações.

    [01:05] E agora, vamos criar um outro atributo que vai representar o fluxo de dados filtrados pelo Input. Depois de todasAcoes$ vou criar filtroPeloInput$, cifrão porque ele vai ser um Observable também, e o que ele vai ser? Ele vai ser, basicamente, o Observable que colocamos na última aula.

    [01:37] Então, vou colocar this.acoesInput porque estou querendo pegar os Observables dos eventos do valueChanges, que é enquanto digitamos. .pipe(), dentro dele eu vou colocar o switchMap e dentro do switchMap eu vou criar uma função e essa função vai ter o que?

    [02:11] Vai receber o (valorDigitado), sinais de igual e maior (=>), porque é uma arrow function, e ele vai retornar, o retorno desse arrow function vai ser o que? Vai ser o fluxo, então, =>this.acoesService.getAcoes, só que dessa vez, filtrado, ou seja, eu vou passar o valorDigitado para o meu serviço. Salvei, o Prettier reformatou.

    [02:44] E, agora, nós temos dois fluxos, todasAcoes e o filtroPeloInput. E agora temos que dar um jeito de combinar esses dois fluxos, e assim, quando a página carregar trazer todas as ações e quando o usuário digitar, vai realizar o filtro. Como fazemos isso?

    [03:06] Utilizando, dessa vez, uma função e não um operador, a função merge do RxJS. Então, em acoes$ eu vou apagar todas as informações, porque todo esse filtro está na classe AcoesComponent, no atributo filtroPeloInput e em acoes$ eu vou utilizar a função = merge.

    [03:31] Ele vai importar do RxJS. A função merge vem direto do RxJS, ela não é um operador. E essa função recebe como parâmetro um ou any Observables, onde ela vai combinar. Então, nesse caso, o merge vamos receber o Observable this.todasAcoes$ e, também, vai receber o Observable this.filtroPeloInput$.

    [04:19] Para vermos o que está acontecendo, vamos colocar o tap para debugar os fluxos, então, em getAcoes do atributo Observable de todasAcoes$, vamos colocar um .pipe(tap e dentro desse tap vou colocar o (console.log)).

    [04:46] No valueChanges, do atributo Observable de filtroPeloInput, vamos criar alguns taps para nós analisarmos o que vai acontecer. Vou colocar um tap e dentro dele, nesse caso, vou criar uma função, porque eu quero informar, deixar bastante destacado que é o fluxo do filtro, então, vou colocar (()=>{console.log(‘Fluxo do filtro’)}),.

    [05:27] Acima, em getAcoes, eu só coloquei (console.log), mas, eu também vou informar. Em vez do tap, vai ser uma função também ()=>, vou criar uma função arrow function e ao invés do que está vindo, porque vão vir as ações, eu vou informar (‘Fluxo Inicial’). Vou salvar e o Prettier está reformatando a minha tela do VS Code.

    [06:00] Vamos olhar a nossa tela do Byte Bank Broker e já mexeu, aparece ‘Fluxo Inicial’ em console log. Vamos recarregar o navegador novamente. Carregou do ‘Fluxo Inicial’.

    [06:13] Se eu começar a digitar na barra de pesquisa de Ações, php, aparece no console log ‘Fluxo do Filtro’, os arrays e no resultado da pesquisa aparece a informação. No caso do php só tem uma ação.

*/

/* FILTER

  [00:00] A nossa página do Byte Bank Broker está funcionando. Mas, se abrirmos no nosso navegador, lado superior direito “Console > Network”, podemos notar que a cada digitação, a cada letra que meu usuário digitar, ele dispara uma requisição ao servidor.

  [00:16] O nosso servidor pode até aguentar as requisições, porém, nós como pessoas desenvolvedoras de front-end, devemos pensar na entrega da experiência para o nosso usuário com o mínimo de recursos gastos no servidor. Por isso, devemos melhorar o nosso código.

  [00:32] Repare que, procurando apenas a letra “A”, o filtro não servirá para muita coisa, pois é muito genérico. Seria ideal a busca começar, apenas, a partir da terceira letra que o nosso usuário digitar. Mas, então, como podemos fazer isso? Podemos usar o operador filter.

  [00:43] De volta ao nosso código, no Visual Studio Code, em “acoes.component.ts”, como o nome indica, o filtro, em inglês filter, faz com que o fluxo vá para a próxima fase somente se alguma condição for atendida.

  [01:08] Vamos analisar nosso código e, primeiro, precisamos identificar em qual dos Observables vamos aplicar esse filtro. Como estamos falando da caixa de entrada, o Observable correto é o filtroPeloInput$.

  [01:26] E agora, em qual momento queremos controlar o fluxo? Lembre-se que a ordem dos operadores é muito importante. Podemos colocar ele antes do switchMap e, para analisarmos o que está acontecendo, vamos colocar taps.

  [01:42] Então, eu vou colocar antes de switchMap, um tap(console.log),, e vamos colocar o nosso novo operador na linha abaixo, o operador filter. Vamos importá-lo. No início do código ele vai importar automaticamente.

  [02:08] E no filter(), ele vai receber uma função e essa função é passada o valor do fluxo, então, no caso, o (valorDigitado)=> e essa função tem que retornar um valor booleano, true ou false, verdadeiro ou falso, para permitir, ou não, que o meu fluxo vá para a próxima fase.

  [02:37] Nesse caso, eu quero que valorDigitado.length; ele tem que ser >= 3. Estou usando no meu VS Code, uma fonte especial que muda o símbolo, mas, está escrito >= .

  [03:09] E se não tiver nada, ele também tem que passar. Lembrando que quando começar a ação, não vai ter nada no filtro, ou se eu apagar o filtro. Então, após >= 3 eu vou colocar || !valorDigitado.length, ou seja, eu quero que passe para a próxima fase se a quantidade de caracteres do valor digitado for maior ou igual a 3 ou não seja nada, seja igual a zero.

  [03:59] Executando na nossa página, voltando para a nossa página do Byte Bank Broker, vou voltar para o Console log, podemos notar que quando eu digitar as duas primeiras letras, não vai acontecer nada. Meu fluxo parou aqui e não foi acionado o switchMap.

  [04:09] A partir do momento que eu coloco a terceira letra, ele engatilha. E, caso não tenha nada, ele limpa o filtro e volta a me trazer todas as ações. Agora podemos economizar recursos, mas, mantendo o código limpo e, mais importante, a experiência do usuário intacta.

*/

/* DEBOUNCE TIME

  [00:00] Já filtramos a quantidade de letras mínimas para começar a busca no servidor, mas, e se o usuário digitar muito rápido o termo e a nossa aplicação front-end realizar buscas intermediárias desnecessárias?

  [00:12] Na tela para demonstrar, analisando o Console log; vou limpar o Console log; note que eu vou digitar rapidamente "alur3". Podemos notar que foi feita a busca pelo termo "alu", "alur" e, por fim, "alur3".

  [00:34] Não seria interessante a nossa aplicação esperar um pouco para a busca ser realizada com o termo que o nosso usuário deseja? Vamos lembrar que essa interface não tem um botão de busca. A busca é realizada conforme o usuário digitar a informação. Então, como podemos fazer essa pausa de maneira elegante e eficaz? Você, provavelmente, pensou em “um operador” e está correto.

  [00:58] Voltando no nosso código, no Visual Studio Code, no arquivo “acoes.component.ts”, o operador, dessa vez, é o DebounceTime e ele recebe, apenas, um valor numérico que representa a quantidade de milissegundos que o fluxo deve esperar. E ele emite para o próximo operador o último valor que foi gerado nesse intervalo.

  [01:18] Para não termos números mágicos na nossa aplicação, é boa prática esses valores fixos nós registrarmos numa variável constante.

  [01:27] Então, no nosso Console log, fora da nossa classe; porque ele não é um atributo, ele só vai ser uma constante; vamos declarar a constante, então const ESPERA_DIGITACAO, estou colocando tudo em caixa alta para deixar claro que é uma constante.

  [01:50] No caso, vou colocar const ESPERA_DIGITACAO = 300;, porque eu quero que espere 300 milissegundos. E, a seguir, vamos inserir o nosso código, no caso, no filtroPeloInput, logo abaixo o primeiro pipe vai ser o debounceTime(). Ele vai ser importado, de novo, ele é um operador; ele é importado no início do código, logo após a importação de merge. E ele, simplesmente, vai receber o (ESPERA_DIGITACAO), um valor numérico que representa a espera da digitação.

  [02:28] Agora, vamos retornar à nossa aplicação no Byte Bank Broker, ele já recarregou, e repare que se eu digitar rápido, ele esperou um pouco para fazer a busca. Ele esperou só 300 milissegundos, mas, tem uma pausa. E ele não fez o filtro do "alur". Se observarmos no nosso console log, ele não fez nenhuma busca pelo termo "a-l-u", ele já foi pelo "alur", que foi o último termo que eu digitei.

  [03:07] Note que essa espera, é muito importante que essa espera não seja muito longa para não prejudicar a experiência do usuário. Precisamos equilibrá-la com a performance da nossa aplicação. Tem mais um detalhe nessa tela. E se o usuário digitar duas vezes o mesmo valor? Devemos fazer mais uma requisição?

*/

/*
  DISTINCT UNTIL CHANGED

  [00:00] Vamos agora fixar melhor esses novos operadores que colocamos na nossa caixa de ferramentas do RxJS, utilizando o Gráfico de Marbles. Temos, primeiro, o filtro onde colocamos nossa condição filter((valor) => valor.length >= 3 || !valor.length) e quando digitamos a letra "a", ela não atende o critério e não passa para a frente; "al" também não passa no critério e não é passada para o próximo operador. Quando digitamos "alu", esse termo tem mais que 3 caracteres e passa no critério.

  [00:29] No debounceTime(300), a questão não é o que passa no critério e sim quando. Temos a letra "a", depois a letra "l" e, por fim, o termo "alu". O termo "alu" será passado para frente, mas, depois de um tempo que, nesse caso, foi definido como 300 milissegundos.

  [00:48] Por fim, temos o distinctUntilChanged(), onde, no exemplo, temos o termo "alu", que é passado para frente do fluxo. Quando temos o termo "alu" novamente, o operador filtra esse valor e não passa para frente, aí, o usuário digita o termo "ala".

  [01:10] O "ala" é diferente do anterior então é passado para o próximo fluxo. O termo "alu" aparece, de novo, e é passado para frente, já que nesse exemplo podemos reparar que o operador trabalha, apenas, com o último valor e não com o fluxo inteiro.

  [01:25] Temos agora todos os operadores fixados, tanto pelo código como pelo gráfico.
*/
