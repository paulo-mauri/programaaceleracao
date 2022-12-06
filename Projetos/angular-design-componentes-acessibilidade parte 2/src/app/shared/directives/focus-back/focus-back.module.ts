import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FocusBackDirective } from './focus-back.directive';

@NgModule({
  declarations: [FocusBackDirective],
  imports: [CommonModule],
  exports: [FocusBackDirective]
})
export class FocusBackModule{}
