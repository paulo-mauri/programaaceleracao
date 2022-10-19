import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken(token: string) {
    localStorage.setItem( KEY, token);
  }

  excluiToken() {
    localStorage.removeItem(KEY);
  }

  possuiToken() {
    return !!this.retornaToken();  // se retornaToken retornar nulo, o primeiro ! (da esquerda) troca para true e o segundo troca para false,
                                  // se o retornaToken é uma string que existe o primeiro ! troca para false e depois vai voltar para true
  }
}
