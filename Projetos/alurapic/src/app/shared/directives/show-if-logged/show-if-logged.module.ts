import { CommonModule } from '@angular/common';
import { ShowIfLoggedDirective } from './show-if-logged.directive';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ShowIfLoggedDirective
    ],
    exports: [
        ShowIfLoggedDirective
    ],
    imports: [
        CommonModule
    ]

})
export class ShowIfLoggedModule{

}
