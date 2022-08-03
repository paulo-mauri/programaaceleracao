import { startWith, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoadingType } from './loading-type';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loadingSubject = new Subject<LoadingType>();

    getLoading() {
        return this.loadingSubject
        .asObservable()
        .pipe(startWith(LoadingType.STOPPED));  // startWith = vc pega um observable, e vc não sabe o que vai emitir
                                                //      vc quer que a primeira emissão seja um valor definida pelo startwith
    }

    start() {
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop() {
        this.loadingSubject.next(LoadingType.STOPPED);
    }
}
