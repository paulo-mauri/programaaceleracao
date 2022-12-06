import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ModalService } from './services/modal.service';
import { FocusTrapModule } from './../../directives/focus-trap/focus-trap.module';
import { FocusBackModule } from './../../directives/focus-back/focus-back.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FocusTrapModule,
    FocusBackModule
  ],
  exports: [ModalComponent],
  providers: [ModalService]   //  quem importar esse módulo, vai ter automaticamente acesso ao ModalService.
                              //   Coloquei meu ModalService, na lista de providers desse módulo.
})
export class ModalModule{

}
