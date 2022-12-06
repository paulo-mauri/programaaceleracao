import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AnimaisService } from './../animais.service';
import { finalize } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css'],
})
export class NovoAnimalComponent implements OnInit {
  // form
  formAnimal!: FormGroup;
  // arquivo para upload
  file!: File;
  //preview da foto
  preview!: string;
  // % concluido
  percentualConcluido = 0;

  constructor(
    private animalService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formAnimal = this.formBuilder.group({
      file: ['',Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload() {
    const allowComments = this.formAnimal.get('allowComments')?.value ?? false;
    const description = this.formAnimal.get('description')?.value ?? '';

    this.animalService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['animais']))
      )
        .subscribe((event: HttpEvent<any>) => {
            if(event.type === HttpEventType.UploadProgress) {
              const total = event.total ?? 1;
              this.percentualConcluido = Math.round(100 * (event.loaded / total));
            }
          },
          (error) => console.log(error)
        );
  }

  gravaArquivo(arquivo: any) {

    const [file] = arquivo?.files;  // usar o destruction para capturar o file, const [file] = arquivo?.files;.
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event:any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }

}
