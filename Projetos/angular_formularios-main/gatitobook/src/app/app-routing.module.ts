import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './autenticacao/login.guard';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',       // entrou na raiz da aplicação joga no component
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), // ativando loadChildren com lazy loading
    canLoad: [LoginGuard]  //   No app-routing.module.ts devemos associar essa guarda-rotas a rota que devemos proteger, no caso se estiver logado
                            // não acessar a pagina de login novamente e redirecionar para rota 'animais'
  },
  {
    path: 'animais',
    loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule),
    canLoad: [AutenticacaoGuard]    // associa o guarda rotas a rota para protecao
                                    // No app-routing.module.ts devemos associar essa guarda-rotas a rota que devemos proteger no caso da rota 'animais',
                                    // para caso não esteja logado redirecionar ao login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
