import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
                .handle(req)
                .pipe(tap(event => {   // tap permite fazer um side-effect executar um código entre assim que os dados chegam e a minha inscrição sobre os dados
                    if(event instanceof HttpResponse) {
                        this.loadingService.stop();
                    }
                    else {
                        this.loadingService.start();
                    }
                }));
    }

}
