import { CommonModule } from '@angular/common';
import { ImmediateClickDirective } from './immediate-click.directive';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ ImmediateClickDirective ],
    exports: [ ImmediateClickDirective ],
    imports: [ CommonModule ]
})
export class ImmediateClickModule {

}
