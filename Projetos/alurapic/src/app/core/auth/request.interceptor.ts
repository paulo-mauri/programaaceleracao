import { TokenService } from './../token/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {

    }

    /*

    Para quem deixou a opção strict do Typescript como true, como eu, e também deixou a assinatura do getToken como "string | null",
        deve estar recebendo o seguinte erro no interceptor, que me deixou confuso no início:



    */

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken()!;
            /*
            O problema é que a constante token tem o tipo "string | null", e os campos do objeto setHeaders só podem ter o tipo string.
            A solução foi tipar a constante como string, e além disso usar a exclamação na chamada do getToken para dizer ao
            typescript que eu garanto que o valor retornado não vai ser null (pois testei antes se havia token):
            */

            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            });
        }

        return next.handle(req);

    }


}
