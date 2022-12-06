import { fade } from './../../animations/fade';
import { Component, HostBinding, TemplateRef, AfterViewInit } from '@angular/core';
import { ModalConfig } from './interfaces/modal-config';
import { ModalRef } from './models/model-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fade]
})
export class ModalComponent {
  @HostBinding('@fade') fade = true;
  public config: ModalConfig;
  public modalRef: ModalRef;
}
