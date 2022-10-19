import { Observable, switchMap, tap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios$!: Observable<Comentarios>;

  comentarioForm!: FormGroup;

  @Input() animalId!: number;

  constructor(private comentarioService: ComentariosService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscaComentario(this.animalId);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)],
    });
  }

  gravar() {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';

    this.comentarios$ = this.comentarioService
                              .incluiComentario(this.animalId, comentario)
                              .pipe(
                                switchMap(() => this.comentarioService.buscaComentario(this.animalId)),
                                tap(() => {
                                  this.comentarioForm.reset();
                                  alert('Salvo Comentario');
                                })
                              );

      /*

      Primeiro eu preciso pegar o texto do comentário, comentario = this.comentarioForm.get(‘comentario’).
        Como eu não sei se tem ou não valor, eu vou utilizar o safe navigation .value. E se não tiver valor, interrogação dupla, é vazio,
        não tem comentário nenhum.

      E vamos fazer aqui um this.comentarios, porque no momento em que ele confirmar, a página tem que ser recarregada,
        então o comentário tem que pegar a nova informação que acabamos de incluir. Vamos manipular isso utilizando o RxJS.

      Vamos fazer o seguinte, this.comentarios$ = this.comentariosService.incluiComentario(this.id, comentario);.
        Só que ele está reclamando que eu quero um observable de comentários, não de comentário. Como nós vamos fazer essa manipulação?
        Vamos utilizar o comando pipe e os operadores do RxJS.

      Esse incluiComentario eu vou fazer .pipe() e vamos, como vimos nas aulas passadas, utilizar um operador chamado switchMap para convertermos o fluxo.
        O fluxo está vindo de inclusão, eu quero convertê-lo para o fluxo de buscar os comentários do servidor.

      Aqui vamos utilizar o operador (switchMap()). E esse operador tem que retornar, então =>, uma arrow function dentro do switchMap,
        ele vai retornar o this.comentariosService.buscaComentario(this.id). Então eu converti, ele até pode reclamar, o comentário está lá.

      Só que além de fazer o switchMap, nós precisamos resetar o formulário. E como fazemos isso? Para fazer o que chamamos de efeitos colaterais,
        ou seja, coisas que não vão influenciar o fluxo, mas precisam acontecer durante o processamento desse fluxo, nós podemos utilizar o operador chamado tap.
        Então aqui, depois do switchMap, ele vai fazer o switchMap e depois ele vai fazer o tap().

      Esse tap vai fazer uma função, só que o que estiver dentro dessa função não influencia no fluxo do RxJS.
        Então eu vou vir aqui no tap() e colocar => this.comentarioForm.reset();, eu vou resetar e eu vou fazer um alert falando que o comentário
        foi salvo, (‘Salvo Comentário’);.

    */

  }

}
