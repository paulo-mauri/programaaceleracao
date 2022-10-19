import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UsuarioService } from './usuario/usuario.service';
/*

  COMANDO PARA GERAR A GUARDA ROTAS JÁ COM A OPÇÃO DE CANLOAD
  ng g guard autenticacao/login --d

  deve-se se marcar o CanLoad pq é uma rota lazy-load

  No app-routing.module.ts devemos associar essa guarda-rotas a rota que devemos proteger, no caso se estiver logado
    não acessar a pagina de login novamente e redirecionar para rota 'animais'

*/

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.usuarioService.estaLogado())
      {
        console.log('entrou aqui.');
        this.router.navigate(['animais']);
        return false;
      }

      return true;
  }
}
