import { UsuariosComponent } from './usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'usuarios',
  //   loadChildren: () => import('./usuarios/usuarios.component').then((p) => p.UsuariosComponent)
  // }
  {
    path: 'usuario',
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
