import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from './../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input()
    photoId: number;

    comments$: Observable<PhotoComment[]>

    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        console.log(this.photoId);
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    save() {
        const comment = this.commentForm.get('comment')?.value as string;
        this.comments$ = this.photoService
            .addComment( this.photoId, comment )
            .pipe(switchMap(() =>  this.photoService.getComments(this.photoId)))
            .pipe(tap(() => {   // antes de retornar o Observable execute este código arbitrário
                this.commentForm.reset();
                // alert('Comentário adicionado');
            }))
    }

}
