import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingInterceptor } from './loading.interceptor';
import { LoadingComponent } from './loading.components';

@NgModule({
    declarations: [
        LoadingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }]
})
export class LoadingModule {

}
