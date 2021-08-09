import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoModule } from './photo/photo.module';
import { NgModule } from '@angular/core';
import { PhotoListModule } from './photos-list/photo-list.module';

@NgModule({
  declarations: [],
  imports: [ PhotoModule, PhotoFormModule, PhotoListModule],
})
export class PhotosModule {}
