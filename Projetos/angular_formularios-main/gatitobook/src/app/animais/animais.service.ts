import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Animais, Animal } from './animais';
import { TokenService } from './../autenticacao/token.service';
import { environment } from 'src/environments/environment';

const API = environment.API;
const NOT_MODIFIED = 304;


@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.httpClient.get<Animais>(`${API}/${nomeUsuario}/photos`);
  }

  buscaPorID(id:number): Observable<Animal> {
    return this.httpClient.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id:number):Observable<Animal> {
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id:number): Observable<boolean>{
    return this.httpClient
    .post(`${API}/photos/${id}/like`, {}, {observe: 'response'})
    .pipe(    // fazer aqui um .pipe() porque eu quero manipular o fluxo da requisição,
              // então eu vou usar o pipe para usar os operators. Caso a operação tenha sucesso, quero que ela retorne true.

      mapTo(true),    // Como eu quero que ela retorne true independentemente da mensagem que dê, simplesmente se for sucesso eu quero que retorne true,
                      // eu vou usar um operador chamado mapTo(), que ele vai sempre emitir o valor que eu colocar aqui, que no caso é (true).
                      // Se retornou 200 ou qualquer requisição de sucesso, 204, 202, etc., vai retornar true para o meu componente.

      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      })  /* Agora, se tiver algum erro, eu quero fazer a seguinte lógica, se o erro for not modify eu retorno como falso,
                se for qualquer outro tipo de erro, eu vou fazer o throw do erro.
              Para fazer isso nós vamos utilizar outro operador, então vou colocar aqui vírgula e o operador que nós vamos utilizar é o catchError(),
                  que só vai executar essa função se a requisição apresentar erro. E aqui eu vou passar uma função, que vai receber o (error),
                  e essa função nós vamos fazer o nosso tratamento.
              Nosso tratamento vai ser o seguinte, eu vou retornar aqui, return, caso o status do error, então error.status === NOT_MODIFIED,
                  aquela constante que nós criamos lá em cima, eu quero que retorne, então interrogação, ? of, um observable que vai tornar (false).
              Lembrando que nós sempre temos que retornar um observable, ou um observable true ou um observable que retorna false, mas nunca a variável só,
                false ou true, tem que ser o observable. Então ele retorna um observable de (false). Caso contrário, então dois pontos, é uma opção ternária,
                  eu vou jogar o error, então throwError(error);.
          */
    )
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {

    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario.toString());
    formData.append('imageFile', arquivo);

    // faz o upload do form e faz o observe o evento de upload , e report o progresso do upload.
    return this.httpClient.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true
    } )

    /*
      [05:24] Então eu não quero o response, eu quero os eventos, então cada passo da requisição eu quero receber no nosso observable,
          eu quero que ele me envie. Então observe: ‘events’ e reportProgress: true,.

      [05:54] E nesse método como ficou? Para o envio o segredo é envelopar o arquivo nesse formData e o
          monitoramento nós fazemos utilizando esse objeto aqui embaixo.

      [06:07] O que acontece? A cada passo da requisição, como estamos no observable, o Angular vai fazer um next nesse observable
          mandando em que etapa está a requisição e nós conseguimos, lá no nosso componente, observar isso utilizando o subscribe,
          e monitorar e mostrar isso para o nosso usuário.

      [06:30] Como nós utilizamos o RxJS para o fluxo das requisições, nós vamos conseguir fazer esse acompanhamento de uma forma bem simples.
          Vamos continuar essa tarefa e vamos criar o formulário de novo animal.

      [06:46] Voltando na nossa linha de comando vamos utilizar o comando ng g animais/novo-animal. ng g,
          generate novo animal, que ele vai criar o componente do novo animal.

      [07:24] E uma vez criada, vamos configurar a rota desse componente. Já temos nosso serviço, vamos lá na nossa rota, “animais-routing.module.ts”, à esquerda.
          E aqui, logo abaixo do path, nós vamos criar o path: ‘novo’ e o component: NovoAnimalComponent.

      [07:59] Com isso nós temos o nosso serviço já configurado, o nosso componente
          já inicializado e agora a rota configurada, e assim nós podemos continuar.
    */

  }



}
