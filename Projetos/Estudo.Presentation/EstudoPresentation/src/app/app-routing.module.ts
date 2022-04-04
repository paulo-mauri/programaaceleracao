import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'novo',
    component: AdicionarUsuarioComponent
  },
  {
    path: 'editar/:id',
    component: EditarUsuarioComponent
  }
  ,
  {
    path: 'excluir/:id/:nome',
    component: ExcluirUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
