import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<any>(null);
    private userName: string;

    /*
        No RxJS, temos o BehaviorSubject que, ao ser criado, se assemelha ao Subject, cujo valor padrão que será emitido para ele no construtor precisará ser definido. Iremos,
    então, trocar o Subject por BehaviorSubject em user.service.ts, na classe UserService.
        Para o Subject, realizamos a emissão quando a queremos, via next(), e para o BehaviorSubject, é preciso informar no construtor o valor padrão a ser
    emitido no momento de sua criação. Caso não haja informações do usuário, será emitido null.
        O problema é resolvido, e ao consultarmos a aba "Application" do navegador, poderemos deletar o nosso token, recarregar a página, e em seguida logar novamente.
    É possível fechar a página e reabri-la, e o nome do usuário continuará sendo exibido.
        Após a emissão de um valor, caso este não seja consumido ou escutado, o BehaviorSubject o manterá armazenado.
        E se alguém faz o subscribe depois, terá acesso ao último valor emitido.
    */

    constructor(private tokenService: TokenService) {

        this.tokenService.hasToken() &&
            this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const tokenAux = this.tokenService.getToken();
        const token = tokenAux === null ? '' : tokenAux;
        const user =  jwt_decode(token) as User;
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}
