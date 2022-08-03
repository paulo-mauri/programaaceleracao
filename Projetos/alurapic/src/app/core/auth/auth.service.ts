import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { UserService } from './../user/user.service';

import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private userService: UserService) { }

    authenticate(userName: string, password: string) {
        //this.http.post(API_URL + '/user/login', { userName: userName, password: password })
        return this.http
            .post(
                API + '/user/login',
                { userName, password } ,
                { observe: 'response' }
            ) // em javascript quando o nome do parametro e variavel forem iguais podem ser simplificados desta forma
            .pipe(tap((res: any) => {
                const authToken = res.headers.get('x-access-token');
                this.userService.setToken(authToken);
                console.log(`O usuário está logado com o token ${authToken}`);
            }))     // entre a execução da operação e o subscribe, eu vou executar um código arbitrário,
                        // permite colocar operações que serão aplicadas, que quem for fazer o subscribe, essas operações terão sido aplicadas antes
    }
}
