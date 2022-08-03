import { Router } from '@angular/router';
import { ServerLogService } from './server-log.service';
import { UserService } from './../../core/user/user.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { map } from 'rxjs/operators';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';

import { environment } from 'src/environments/environment';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

    handleError(error: any): void {

        console.log('passei pelo handler');

        // trocando a injeção do construtor para ser feito dentro do handle error, pq quando esse erro for processado, tenha certeza que o global error handle
        //          já está pronto e se obter alguém daqui (da injeção de do locationStrategy) der algum problema será capturado dentro do dele (do global error handle)
        const location = this.injector.get(LocationStrategy);

        // injetor o userService
        const userService = this.injector.get(UserService);

        // injetar o serviço de log
        const serverLogService = this.injector.get(ServerLogService);

        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';

        const message = error.message
            ? error.message :
            error.toString();

        if(environment.production) router.navigate(['/error']);

        StackTrace
            .fromError(error)      // retorna um promise
            .then(stackframes => {
                const stackAsString = stackframes
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString)

                serverLogService.log({
                    message,
                    url,
                    userName: userService.getUserName(),
                    stack: stackAsString })
                    .subscribe(
                        () => { console.log('Error logged on server')},
                        err => {
                            console.log(err);
                            console.log('Fail to send error log');
                        })
            })
    }
}
