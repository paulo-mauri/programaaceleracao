import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { ModalConfig } from '../interfaces/modal-config';
import { ModalComponent } from './../modal.component';
import { BodyInjectorService } from './../../../services/body-injector';
import { ModalRef } from '../models/model-ref';

@Injectable()
export class ModalService {

  private componentFactory: ComponentFactory<ModalComponent>;
  constructor(
      componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector,
      private bodyInjectorService: BodyInjectorService)
    {
    this.componentFactory = componentFactoryResolver.resolveComponentFactory(ModalComponent)
  }

  public open(config: ModalConfig): ModalRef {
    const componentRef = this.createComponentRef();
    componentRef.instance.config = config;
    console.log('open called');
    this.bodyInjectorService.stackBeforeAppRoot(componentRef);
    const modalRef = new ModalRef(componentRef);
    componentRef.instance.modalRef = modalRef;
    return modalRef;
  }

  private createComponentRef(): ComponentRef<ModalComponent>  {
    return this.componentFactory.create(this.injector);
  }

}


