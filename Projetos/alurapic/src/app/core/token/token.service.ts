import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken() {
        return !!this.getToken(); // se getToken retornar nulo o primeiro ! (da esquerda) troca para true e o segundo troca para false,
                                  // se o getToken é uma string que existe o primeiro ! troca para false e depois vai voltar para true
    }

    setToken(token: string) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}
