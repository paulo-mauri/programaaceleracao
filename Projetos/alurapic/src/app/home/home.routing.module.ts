import { LoginGuard } from './../core/auth/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home..component';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [
    {
        path: '',                   // entrou na raiz da aplicação joga no component
        component: HomeComponent,
        canActivate: [ LoginGuard ],   /* O guarda de rotas serve para darmos consistência para nossa aplicação,
                                    liberando acesso apenas para as rotas que fazem sentido para nosso usuário. */
        children: [
            {
                path: '',
                component: SignInComponent,
                data: {
                    title: 'Sign in'
                }
            },
            {
                path: 'signup',
                component: SignupComponent,
                data: {
                    title: 'Sign up'
                }

            },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)], // todo arquivo de rota de lazy loading, que não esta na esquema de rotas do pai deve ser forChild().
                                              // Isso é muito importante: na definição das rotas, cria-se o módulo a ser carregado preguiçosamente e,
                                              // no momento em que formos compilar as rotas para dentro do módulo, não devemos utilizar forRoot(),
                                              // pois quem fará isto é o módulo principal de rotas da aplicação, que no caso é app.routing.module.ts.
    exports: [RouterModule]
})
export class HomeRoutingModule { }
