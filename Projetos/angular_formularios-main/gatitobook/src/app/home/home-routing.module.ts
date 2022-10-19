import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  {
    path: '', // cada elemento criado aqui é do ponto de vista do somento modulo, não se está enxergando os outros modulos, estou só enxergando as rotas desse modulo
    component: HomeComponent,
    children: [   // rotas filhas do Home component -- SUB-ROTAS DO HOME COMPONENT
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'novousuario',
        component: NovoUsuarioComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
