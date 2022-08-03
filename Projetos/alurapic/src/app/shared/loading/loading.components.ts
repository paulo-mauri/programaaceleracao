import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { LoadingService } from './loading.service';
import { LoadingType } from './loading-type';

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.components.html',
    styleUrls: ['./loading.components.css']
})
export class LoadingComponent implements OnInit {

    loading$: Observable<string>;

    constructor (private loadingService: LoadingService) { }

    ngOnInit(): void {
        this.loading$ = this.loadingService
            .getLoading()
            .pipe(map(loadingType => loadingType.valueOf() as string));
    }
}
