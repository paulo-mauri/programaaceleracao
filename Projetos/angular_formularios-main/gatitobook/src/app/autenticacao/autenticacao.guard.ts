import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from './usuario/usuario.service';
/*

  COMANDO PARA GERAR A GUARDA ROTAS JÁ COM A OPÇÃO DE CANLOAD
  ng g guard autenticacao/autenticacao --d

  deve-se se marcar o CanLoad pq é uma rota lazy-load

  No app-routing.module.ts devemos associar essa guarda-rotas a rota que devemos proteger no caso da rota 'animais', para caso não esteja logado redirecionar ao login

*/

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanLoad {

  /**
   *
   */
  constructor(private usuarioService: UsuarioService,
              private Router: Router ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.usuarioService.estaLogado()) {
        this.Router.navigate(['']);
        return false;
      }

      return true;
  }
}
