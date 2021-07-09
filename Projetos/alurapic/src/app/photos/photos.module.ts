import { PhotoComponent } from './photo/photo.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [PhotoComponent],
  exports: [PhotoComponent]
})
export class PhotosModule {}
