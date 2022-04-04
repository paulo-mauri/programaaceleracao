import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AdicionarUsuarioComponent,
    EditarUsuarioComponent,
    ExcluirUsuarioComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
