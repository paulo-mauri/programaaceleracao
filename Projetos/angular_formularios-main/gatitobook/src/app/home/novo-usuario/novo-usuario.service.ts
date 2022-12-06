import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { NovoUsuario } from './novo-usuario';

const API= environment.API;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  cadastraNovoUsuario(novoUsuario: NovoUsuario) {
    return this.httpClient.post<NovoUsuario>(API + '/user/signup' , novoUsuario);
  }

  verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(API + `/user/exists/${nomeUsuario}`);
  }
}
