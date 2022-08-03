import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { PhotoService } from './../photo/photo.service';

@Component({
    selector: 'ap-photo-form',
    templateUrl: './photo-form.component.html',
    styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: string;
    percentDone: number;

    constructor(private formBuilder: FormBuilder,
                private photoService: PhotoService,
                private router: Router,
                private alertService: AlertService,
                private userService: UserService) { }

    ngOnInit(): void {
        this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true],
        })
    }

    /*
    Evento onChange do input image para armazenar na variavel local
    */
    onChange(target: any) {
        if(target instanceof EventTarget) {
            let element = target as HTMLInputElement;
            let files = element.files
            if (files) {
                this.file = files[0]
                const reader = new FileReader();
                reader.onload = (event: any) => this.preview = event.target?.result;
                reader.readAsDataURL(this.file);

            }
        }
    }

    upload() {
        const description = this.photoForm.get('description')!.value;
        const allowComments = this.photoForm.get('allowComments')!.value;
        this.photoService
            .upload(description, allowComments, this.file)
            .pipe(finalize(() => {
                this.router.navigate(['/user', this.userService.getUserName()]);
            })) // O operador finalize() garante que um trecho de código seja executado tanto após o sucesso ou fracasso da operação.
            .subscribe(
                (event: HttpEvent<any>) => {
                    if(event.type == HttpEventType.UploadProgress) {
                        if(event.total) {
                            const total = event.total;
                            this.percentDone = Math.round(100 * event.loaded / total);
                        }
                    }
                    else if ( event instanceof HttpResponse ) {
                        this.alertService.success('Upload complete', true);
                    }
                },
                (error) => {
                    console.log(error);
                    this.alertService.danger('Upload error', true);
                });
    }
}
