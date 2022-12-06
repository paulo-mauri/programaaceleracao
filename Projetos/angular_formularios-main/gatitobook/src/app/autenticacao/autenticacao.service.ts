import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { UsuarioService } from './usuario/usuario.service';
import { environment } from 'src/environments/environment';

const API = environment.API;

@Injectable({
  // essa notação indica que essa classe pode ser injetada em outro componente ou serviço
  providedIn: 'root', // providedIn: root == instanciação Global, todos os componentes tem o acesso ao mesmo estado do serviço.. Singleton
})
export class AutenticacaoService {
  constructor(private httpClient: HttpClient,
              private usuarioService: UsuarioService) {}

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post(
      API + '/user/login',
      {
        userName: usuario,
        password: senha,
      },
      {
        observe: 'response',
      }
    )
    .pipe(
      tap((response) => {
        const authToken = response.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
      })
    )
  }
}
