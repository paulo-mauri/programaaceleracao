import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);

      // o objeto request é imutável, estão é necessário fazer um clone do mesmo e adicionar a informação do http headers.
      request = request.clone({headers: headers});
    }

    // repassa para frente a requisição
    return next.handle(request);
  }
}
