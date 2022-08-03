import { ReactiveFormsModule } from '@angular/forms';
import { PhotoModule } from './../photo/photo.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.diewctive';
import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        ShowIfLoggedModule
    ]
})
export class PhotoDetailsModule {

}
