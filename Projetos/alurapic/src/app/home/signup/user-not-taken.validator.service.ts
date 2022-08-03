import { AbstractControl, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) { }

    //retornará uma função de validação
    checkUserNameTaken() {
        return (control: FormControl) => {
            return control.valueChanges //Observable que emite o valor do input
             .pipe(debounceTime(300)) //Ignorar as emições do Observable que ocorram em menos 300ms de intervalo entre uma emissão e outra

              /*
                      Após os 300ms, pegue a última emissão do Observable e receba como parâmetro
                     do operador switchMap. A partir disso crie e retorne um novo Observable
              */
             .pipe(switchMap(userName => this.signUpService.checkUserNameTaken(userName)))

            /*
                    Receba como parâmetro a emissão do Observable retornado pelo switchMap
                 A partir disso, pegue a emissão e retorne mais um Observable,
                 no caso dos tipo Observable<null> ou Observable<object>
            */
             .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))

             /*
                     Forçar o Observable a completar após a primeira emissão.
                     Já que caso não seja feita isso, o sistema de validação do Angular
                     irá realizar o subscribe() entretanto não irá consumir o valor da emissão e
                     ficará escutando eternamente.
             */
             .pipe(first());
        }
     }
}
