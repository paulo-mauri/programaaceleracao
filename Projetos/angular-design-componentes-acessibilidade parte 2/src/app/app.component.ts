import { fade } from './shared/animations/fade';
import { ModalService } from './shared/components/modal/services/modal.service';
import { Component, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ModalRef } from './shared/components/modal/models/model-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fade]
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('modal')
  public modalTemplateRef: TemplateRef<any>;
  public modalRef: ModalRef;
  public info = false;
  public form: FormGroup;

  // @ViewChild('template1') public template1: TemplateRef<any>;
  // @ViewChild('template2') public template2: TemplateRef<any>;
  // public selectedTemplate: TemplateRef<any>;

  title = 'a11y-p2';
  public firstName='Paulo';

  // constructor(private modalService: ModalService,
  //             private changeDetector: ChangeDetectorRef)
  // { }

  constructor(private modalService: ModalService,
              private formBuilder: FormBuilder)
  { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['Paulo', Validators.required],
      surName: ['', Validators.required],
      age: ['', Validators.required],
      info: [false]
    })
  }

  ngAfterViewInit(): void {
    // Aqui esta se mudando um valor após a view ter sido inicializada..
    //this.selectedTemplate = this.template1;
    // garante que um ciclo de detecção de mudança do angular será requisitado novamente.
    //this.changeDetector.detectChanges();
  }

  public show(): void {
    //this.selectedTemplate = this.template2;
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details'
    });
  }

  public submit(): void {
    if(this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.modalRef.close();
  }

}
