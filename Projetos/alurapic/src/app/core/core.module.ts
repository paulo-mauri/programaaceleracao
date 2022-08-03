import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './auth/request.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from './../shared/components/alert/alert.module';
import { MenuModule } from './../shared/components/menu/menu.module';
import { LoadingModule } from './../shared/loading/loading.module';
import { ShowIfLoggedModule } from './../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule,
        ShowIfLoggedModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {

}
