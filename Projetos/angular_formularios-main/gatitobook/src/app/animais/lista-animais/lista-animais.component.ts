import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Animais } from '../animais';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {

  animais!: Animais;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.params
          .subscribe(param => {
            this.animais = this.activatedRoute.snapshot.data['animais'];
          });

    // subscribe hell!
    // this.usuarioService.retornaUsuario().subscribe(
    //   (usuario)=>{
    //     //
    //     const userName = usuario.name ?? '';
    //     //
    //     this.animaisService.listaDoUsuario(userName).subscribe(
    //       (animais) => {
    //         console.log(animais);
    //         this.animais = animais;
    //     });
    //   });

    // this.animais$ = this.usuarioService.retornaUsuario().pipe(
    //   switchMap((usuario) => {
    //     const userName = usuario.name ?? '';
    //     return this.animaisService.listaDoUsuario(userName);
    //   })
    // );
  }
}
