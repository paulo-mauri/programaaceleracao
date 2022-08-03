import { AlertComponent } from './alert.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AlertComponent
    ],
    exports: [
        AlertComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AlertModule {

}
