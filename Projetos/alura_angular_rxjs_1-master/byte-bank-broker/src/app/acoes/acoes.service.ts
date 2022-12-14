import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck, tap } from 'rxjs/operators'
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  /// parametro opcional com interrogacao ? = parametro?
  /// valor?:

  getAcoes(valor?: string) {
    const params = valor
                    ? new HttpParams().append('valor', valor)
                    : undefined;

    return this.httpClient
               .get<AcoesAPI>('http://localhost:3000/acoes', { params: params })
               .pipe(
                  tap((valor) => console.log(valor)), //Verifica o que o observable esta enviando para o map == antes de fazer o map de ordenação,
                                                      // fazer um map para extrair o array que esta dentro da propriedade payload.
                  // map((api) => api.payload),    // agora retorna o array de payload
                  pluck('payload'), // Então, vou apagar o primeiro operador map no método getAcoes e invés de utilizá-lo,
                                    // vou usar o operador pluck. Esse operador pluck não recebe uma função, ele recebe uma string,
                                    // que é o nome da propriedade que eu quero extrair do objeto que eu estou recebendo, no caso, o payLoad. Ele faz a mesma coisa.
                  map(
                      (acoes) => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
                  )
                ); //
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if (acaoA.codigo < acaoB.codigo){
      return -1;
    }

    return 0;
  }

  /*
    MAP

    [00:58] No nosso requisito, precisamos mudar o objeto que o fluxo retorna, no caso, o array de Ações, para um array de Ações ordenado.

    [01:07] Para isso, vamos usar o operador map no método GetAcoes(), finalizando com .pipe(map(). O operador map do RxJS pode ser importado, então, no início do código, adicionamos import {map} from ‘rxjs/operators’. Importante: ‘operators’ com “S”.

    [01:35] Essa função map vai receber como parâmetro uma função, então, sempre trabalhamos com funções no RxJS. Então, o map vai receber uma função, que recebe como parâmetro o dado, o objeto que vem do fluxo, no caso, (acoes), e espera como retorno um novo objeto, que no nosso caso é o mesmo array de Ações, porém, ordenado.

    [02:07] Então, =>acoes.sort

    [02:23] O método sort() do array padrão do JavaScript, ele espera o que? Uma função de ordenação. Essa função de ordenação vai receber sempre um par de objetos, ou seja, o primeiro objeto que vai ser ordenado e o segundo, o terceiro e o quarto; e assim por diante para fazer a ordenação.

    [02:44] Então, no caso, eu vou dar o nome de (acaoA, acaoB) e essa função, ela vai fazer o seguinte, se acaoA for maior que acaoB, tem que retornar o valor 1. Se acaoB for maior, estiver que estar na frente da acaoA, tem que retornar -1. Essa é a lógica da ordenação do array padrão do JavaScript, não tem muito a ver com o RxJS.

    [03:22] Para isso, eu vou fazer um método private no meu serviço chamado .ordenaPorCodigo() que vai receber como parâmetro (acaoA, acaoB). Vou salvar aqui. Vou criar o meu método privado, porque eu não quero expor ele no meu serviço, então, private ordenaPorCodigo() que vai receber (acaoA, acaoB).

    [04:18] Para facilitar a nossa vida, eu vou tipar ele com uma interface que criamos, chamada de Acao, porque aí eu tenho o autocomplete, as verificações de tipo. Então, é do tipo Acao os dois objetos que eu estou recebendo.

    [04:41] Então,dentro dessa função private, if(acaoA.codigo > acaoB.codigo, se o código da ação A for maior do que o código da ação B, ou seja, estou ordenando; primeiro tem que ser o A e depois o B; então, a função vai retornar 1 return 1. E if(acaoA.codigo < acaoB.codigo){, ele vai retornar -1 return -1. E se os dois forem iguais, ou seja, se não passarem nem no primeiro e nem no segundo if, o que significa que os dois são iguais, ele vai retornar 0 return 0

    [05:59] Vamos executar o nosso código do front-end. No caso, eu deixei ele executando, então, ele compilou com sucesso. E, se olharmos no nosso Home Broker, aconteceu um erro: "acoes.sort is not a function".

    [06:20] Então, no meu console log, quando eu apertar o botão “F12” no navegador, aparece esse erro.

  */


  /*
    TAP
    MAP
    pluck

    [00:00] Para corrigir esse erro, precisamos de alguma forma, ver o que está acontecendo dentro do fluxo do Observable. E para fazer essa operação, podemos usar um operador.

    [00:10] Antes de map, no Visual Studio Code, no arquivo “acoes.service.ts”, antes do operador map, vamos usar um operador chamado tap para verificar o que o Observable está fazendo, está enviando para o map.

    [00:28] É muito importante a ordem dos operadores, pois, assim como um cano, o resultado de um operador é passado para o próximo. Então, no tap ele também vai receber uma função e essa função, ela tem como parâmetro o (valor) que está sendo enviado e, em seguida, eu vou colocar o famoso =>console.log(valor), para verificar o que está acontecendo.

    [01:08] Ao contrário do operador map, o operador tap não altera o objeto, o fluxo. Então, o retorno; no caso, eu não estou retornando nada, porque eu consolidei o log; ele não está influenciando no meu fluxo. Na verdade, eu só estou verificando esse ponto do meu fluxo.

    [01:26] Se eu olhar no meu navegador, no console log, podemos ver que ele está recebendo um payLoad. Então, o map não está recebendo o array, ele está recebendo o objeto que tem o payLoad, que tem esse array.

    [01:46] Então, antes de fazer o map, devemos extrair esse array da propriedade e, para isso, vamos usar também o map. Porque, lembrando, sempre que eu quero alterar o objeto do meu fluxo, eu uso o operador map.

    [02:02] Então, no Visual Studio Code, dentro do arquivo acoes.service.ts, antes do map de ordenação, eu vou fazer um map nessa função; essa função não está retornando uma ação, está retornando o retorno da API; map((api)=> e eu quero que no meu fluxo, no fluxo da minha informação, troque a API pelo array que está dentro da propriedade payLoad. Vou retornar api.payLoad) vírgula.

    [02:43] Muito importante prestar atenção na ordem. O tap, neste método getAcoes, é só para fazermos o debug, verificar o que está acontecendo. Mas, primeiro eu vou fazer o map retornando o payLoad, porque o que ele vai receber aqui? Ele vai receber o que está no payLod, que são as ações.

    [03:03] Vamos olhar no Byte Bank Broker novamente, vamos notar que o erro no console log desapareceu. Porém, pararam de aparecer os dados em Ações, por quê?

    [03:18] Vamos no ng component, no Visual Studio Code, dentro do arquivo “acoes.component.ts” e dentro do método ngOnInit podemos notar que não precisamos mais do payLoad, porque nossa API, o nosso serviço, já está enviando o array pronto, então, não precisamos extrair essa informação.

    [03:34] Ao invés do retorno.Api, eu posso mudar essa variável (retornoApi) que recebe, porque o meu serviço, o meu método getAcoes não está mais me retornando o (retornoApi( e sim o array de Ações. Então, no método ngOnInit, vou trocar (retornoApi) por (acoes) e o this.acoes vai receber acoes.

    [04:04] Vamos no Byte Bank Broker, novamente, e apareceram todas as ações. Apareceram ordenados os nossos cards.

    [04:12] Essa operação de extrair um atributo de um objeto, para se trabalhar com ele, é tão comum que a equipe do RxJS criou um operador só para isso, que chama pluck. Invés de, no Visual Studio Code no arquivo ”acoes.component.ts”, fazer o map, podemos utilizar um operador especificamente para isso.

    [04:37] Então, vou apagar o primeiro operador map no método getAcoes e invés de utilizá-lo, vou usar o operador pluck. Esse operador pluck não recebe uma função, ele recebe uma string, que é o nome da propriedade que eu quero extrair do objeto que eu estou recebendo, no caso, o payLoad. Ele faz a mesma coisa.

    [05:02] Se voltarmos para o Byte Bank Broker, podemos notar que continua funcionando só que com um código mais sucinto, mais elegante. Eu não preciso criar um map só para fazer essa extração, eu posso usar o pluck, que dá o mesmo efeito.

    [05:19] Agora, com nosso serviço turbinado com operadores, será que conseguimos melhorar ainda mais o nosso componente? Vamos ver na próxima aula.
  */
}
