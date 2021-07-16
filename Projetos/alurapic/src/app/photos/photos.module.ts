import { PhotoFormComponent } from './photo-form/photo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './photo/photo.component';
import { NgModule } from '@angular/core';
import { PhotosListComponent } from './photos-list/photos-list.component';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos-list/photos/photos.component';

@NgModule({
  declarations: [PhotoComponent, PhotosListComponent, PhotoFormComponent, PhotosComponent],
  imports: [HttpClientModule, CommonModule],
})
export class PhotosModule {}
