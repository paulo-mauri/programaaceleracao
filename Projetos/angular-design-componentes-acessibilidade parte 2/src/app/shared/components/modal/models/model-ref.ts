import { ComponentRef } from '@angular/core';
import { ModalComponent } from '../modal.component';

export class ModalRef {

  constructor(private componentRef: ComponentRef<ModalComponent>){}

  public close(): void {
    console.log('close called');
    this.componentRef.destroy();
  }

}
