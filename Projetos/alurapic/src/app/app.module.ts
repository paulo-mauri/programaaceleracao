import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      PhotosModule,
      ErrorsModule,
      // HomeModule, sai fora do app.module para lazy loading
      CoreModule,
      AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
