import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of, switchMap, take } from 'rxjs';

import { Usuario } from 'src/app/autenticacao/usuario/usuario';
import { Animais } from '../animais';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  /*
  [00:00] Nós trabalhamos neste curso o uso da guarda para organizar o fluxo de navegação do nosso usuário na nossa aplicação. Mas agora também pode ser uma ferramenta muito útil para a performance da nossa aplicação.

  [00:12] Vamos voltar no nosso componente de lista de animais. Podemos notar aqui que o carregamento das informações das fotos ocorre no ciclo de vida ngOnInit, que é quando a página é carregada, então ele começa a fazer a busca e vai preenchendo. Vamos criar um serviço especial para alterar esse fluxo.

  [00:37] Na nossa linha de comando, nós paramos o nosso servidor, vou limpar a tela. E vamos criar um novo serviço chamado ng g, g de generate, só que ao invés de usar o s de service, vamos usar o resolver, ng g resolver. Ele vai ficar em animais/lista-animais/lista-animais. Vai ficar na pasta lista-animais com o nome lista-animais. Vou pressionar “Enter” e ele vai criar para nós esse arquivo “lista-animais.resolver.ts”.

  [01:27] Se formos no nosso IDE, podemos notar que ele é um serviço com o providedIn: ‘root’, só que ele é um serviço especial, que implementa essa interface chamada resolve e ela exige esse método chamado resolve.

  [01:51] O objetivo desse serviço é realizar alguma operação, carregar alguma informação antes da rota ser resolvida. Então, na lista, nós carregávamos os animais a partir do componente já criado. Aqui, nesse caso, não, vamos começar a fazer a busca na API antes, enquanto a página é renderizada.

  [02:16] Quando o usuário clicar na rota ou for na rota, ele já vai começar a busca. Nós vamos ganhar um pouco de tempo de fazer isso não quando o componente estiver pronto, mas sim adiantar esse trabalho.

  [02:29] Aqui no serviço vamos fazer o seguinte, o objetivo desse serviço é carregar a lista de animais antes do componente ser renderizado. Para isso, nós precisamos injetar os serviços que vamos utilizar. Aqui no constructor vamos injetar (private animaisService: AnimaisService, private usuarioService: UsuarioService). Aqui nós temos os nossos serviços que nós vamos utilizar.

  [03:19] Aqui no resolve nós vamos mudar, ao invés de retornar um Observable<boolean>, ele vai tornar um Observable<Animais>, porque é isso que eu quero carregar, eu quero carregar e trazer os animais da nossa API. Nós vamos colocar o observable de animais. Vamos importar.

  [03:39] E aqui, return of(true), vamos ter que mudar, então vai ser o seguinte, return this.usuarioService.retornaUsuario(), muito parecido com o que está lá no ng component. Então retornaUsuario().pipe().

  [03:59] Esse .pipe(), eu vou fazer o quê? Um switchMap(), porque vamos converter o fluxo de informação do usuário para o animaisService. Então aqui no switchMap() eu recebo (usuario)=>, uma arrow function, e vou pegar aqui, const userName = usuario.name, e se for indefinido, então interrogação interrogação, vazio.

  [04:37] E agora vou fazer aqui um return this.animaisService.listaDoUsuario(userName);. Muito parecido com o que tem aqui no constructor. Deixa eu ver aqui por que ele está reclamando.

  [04:59] Ele está dando esse problema porque aqui eu estou falando que implements Resolve<boolean>, e nós alteramos aqui a assinatura para Resolve de animais. Então aqui em cima, no export class, eu também tenho que alterar o Resolve<Animais>. Agora deu certo.

  [05:15] Agora vamos configurar a nossa rota para ele chamar esse resolver quando o usuário for para a rota. Vamos lá no arquivo “animais-routing.module.ts”. E aqui na lista de animais nós vamos utilizar não o guard e sim a propriedade resolve. E esse resolve recebe um objeto.

  [05:39] E aqui, diferente de receber lá o array ou somente o resolve, eu preciso atribuir esse resolve a uma variável, no caso, eu vou chamar essa variável de animais:, que vai ser a ListaAnimaisResolver.

  [06:00] O que isso significa? Que ele vai resolver – até o nome, resolve – mas ele vai fazer a busca no back-end, trazer o observable, retirar a informação do observable e colocar aqui na variável animais. E com isso nós temos o acesso a isso antes do componente ser renderizado.

  [06:22] Agora nós podemos retrabalhar o nosso componente lista de animais. Vamos voltar aqui em “lista-animais.component.ts” e aqui vamos modificá-lo. Ao invés de ele ter um observable, nós vamos voltá-lo a ser somente uma lista de animais. Vamos voltar aqui.

  [06:45] Como nós não vamos fazer a busca aqui de dentro do lista animais, quem vai resolver isso é a guarda de resolver, nós vamos tirar esses dois serviços daqui, private usuarioService: UsuarioService, private animaisService: AnimaisService, e vamos importar o serviço activatedRoute, para conseguirmos pegar essa lista de animais da nossa rota.

  [07:08] Vamos no construtor alterar para private activatedRoute: ActivatedRoute. E aqui no ngOnInit, ao invés de eu fazer esse tratamento que agora estamos fazendo lá no resolver, eu vou tirar isso e aqui vou fazer o seguinte, this.activatedRoute.params, e esse params é um observable, e para buscar informações de dentro do observable eu vou usar o .subscribe().

  [07:59] Aqui eu vou ter todos os params, então pode ser um ou n resolvers dentro da mesma rota, então aqui no caso eu vou pegar os (param => e dentro eu vou fazer o seguinte, this.animais = this.activatedRoute.snapshot.data. E aqui no data vamos pegar a propriedade [‘animais’];.

  [08:32] Com isso, o this.animais já vai receber o dado já processado pelo nosso resolver. O último ponto que falta é lá na nossa lista de animais, como nós não temos mais, vamos tirar esse ngIf e o animais já está resolvido dentro do componente. Vamos executar a nossa aplicação. Então vamos voltar aqui no nosso IDE, utilizar o comando ng s --o.

  [09:02] E se acessarmos, nós vamos ver que gerou um erro. Vou dar aqui um “F12”, podemos notar que não apareceu nada, deu algum erro. Vou fazer um logout, “alvaro”, “12345678”, vou me logar e nem acessou. Vamos ver aqui, deu um erro. Aliás, ele acessou, mas não fez nada. Ele não foi para a rota. O que será que aconteceu? Vou fechar aqui.

  [09:40] O que acontece é que quando utilizamos o resolve nós temos que garantir que o observable seja finalizado. Se formos aqui na “lista-animais.resolver.ts”, o lista de usuários, o http se auto finaliza, porque é uma requisição, então acabou a requisição, ele finaliza.

  [10:00] Porém, a retornaUsuario é um serviço que nós utilizamos o subject. Se formos lá em retornaUsuario nós podemos notar que ele está usando um subject, então enquanto esse subject estiver aberto, se nós não manualmente falarmos para parar, para só aceitar um item do fluxo, ele vai ficar ainda aberto.

  [10:23] Para nós resolvermos isso podemos utilizar o RxJS. Então aqui no RxJS, depois do switchMap, nós vamos utilizar o operador take e vou colocar (1). O que é esse take(1)? Ele significa o seguinte, você vai fazer isso, então o usuário que for passar vai fazer o switchMap e depois vai finalizar, ou seja, ele vai fazer somente uma vez esse fluxo.

  [10:52] Se formos novamente no nosso IDE e executarmos novamente o nosso servidor, então ng s --o. Agora vamos aqui no login colocar “alvaro”, senha “12345678”, vou pressionar “Enter” e voilà, voltou a funcionar. Por quê? Porque agora o resolver faz o que tem que fazer e se completa. De novo, não por causa da requisição, a requisição já se auto completa naturalmente.

  [11:26] O problema nesse caso, que tivemos que resolver com o take(1), é que o usuarioService não é uma requisição, ele é um observable do tipo subject, enquanto alguém fizer um .next no subject, o observable vai estar aberto, por isso que precisamos fazer esse tratamento no take(1). Mas podemos notar aqui que está funcionando perfeitamente e agora nós podemos continuar.
  */

  /*

  Se formos no nosso IDE, podemos notar que ele é um serviço com o providedIn: ‘root’, só que ele é um serviço especial,
    que implementa essa interface chamada resolve e ela exige esse método chamado resolve.

  O objetivo desse serviço é realizar alguma operação, carregar alguma informação antes da rota ser resolvida.
    Então, na lista, nós carregávamos os animais a partir do componente já criado. Aqui, nesse caso, não, vamos começar a fazer a busca na API antes,
    enquanto a página é renderizada.
  */

  constructor(private animaisService: AnimaisService,
              private usuarioService: UsuarioService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {

    return this.usuarioService
            .retornaUsuario()
            .pipe(switchMap((usuario: Usuario) => {
              const userName = usuario.name ?? '';
              return this.animaisService.listaDoUsuario(userName);
            }),
            take(1));
            /*
            [10:00] Porém, a retornaUsuario é um serviço que nós utilizamos o subject. Se formos lá em retornaUsuario nós podemos notar que ele está usando um subject, então enquanto esse subject estiver aberto, se nós não manualmente falarmos para parar, para só aceitar um item do fluxo, ele vai ficar ainda aberto.

            [10:23] Para nós resolvermos isso podemos utilizar o RxJS. Então aqui no RxJS, depois do switchMap, nós vamos utilizar o operador take e vou colocar (1). O que é esse take(1)? Ele significa o seguinte, você vai fazer isso, então o usuário que for passar vai fazer o switchMap e depois vai finalizar, ou seja, ele vai fazer somente uma vez esse fluxo.

            [10:52] Se formos novamente no nosso IDE e executarmos novamente o nosso servidor, então ng s --o. Agora vamos aqui no login colocar “alvaro”, senha “12345678”, vou pressionar “Enter” e voilà, voltou a funcionar. Por quê? Porque agora o resolver faz o que tem que fazer e se completa. De novo, não por causa da requisição, a requisição já se auto completa naturalmente.

            [11:26] O problema nesse caso, que tivemos que resolver com o take(1), é que o usuarioService não é uma requisição, ele é um observable do tipo subject, enquanto alguém fizer um .next no subject, o observable vai estar aberto, por isso que precisamos fazer esse tratamento no take(1). Mas podemos notar aqui que está funcionando perfeitamente e agora nós podemos continuar.

            */
  }
}
