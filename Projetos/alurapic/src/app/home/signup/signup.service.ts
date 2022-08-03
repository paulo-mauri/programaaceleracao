import { NewUSer } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {

    }

    checkUserNameTaken(userName: string) {
        // checa via api se ja existe o nome de usuario
        return this.http.get(API + '/user/exists/' + userName);
    }

    signUp (newUser: NewUSer) {
        return this.http.post(API + '/user/signup', newUser);
    }
}
