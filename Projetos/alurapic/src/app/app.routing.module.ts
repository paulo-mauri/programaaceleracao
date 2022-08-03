import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',      // se nao colocar full, tem que ser examente a rota com a /
        redirectTo: 'home'
    },
    {
        path: 'home',                   // entrou na raiz da aplicação joga no component
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)    // ativando loadChildren com lazy loading

    },
    {
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },
        data: {
            title: 'Timeline'
        }
    },
    {   path: 'p/add',
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Photo Upload'
        }
    },
    {   path: 'p/:photoId',
        component: PhotoDetailsComponent,
        data: {
            title: 'Photo Details'
        }
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },
    {
        path: 'error',
        component: GlobalErrorComponent,
        data: {
            title: 'Error'
        }
    },
    {
        path: '**',
        redirectTo: 'not-found'
    },
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, { useHash: true })] // useHash: true para HashLocationStrategy
    imports: [RouterModule.forRoot(routes, { useHash: false })], // o import esta recebendo o resultado de RouterModule para essa lista de rotas
    // É como se tivéssemos um RouterModule pré-configurado que conhece as rotas da aplicação de antemão, em vez de passarmos um RouterModule que não sabe de nada.
    exports: [RouterModule]
})
export class AppRoutingModule { }
