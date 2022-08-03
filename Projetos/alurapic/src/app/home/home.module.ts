import { SignUpService } from './signup/signup.service';
import { HomeRoutingModule } from './home.routing.module';
import { RouterModule } from '@angular/router';
import { VMessageModule } from './../shared/components/vmessage/vmessage.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home..component';

/*

O mais importante é entendermos que o home.module.ts, declara SignInComponent, que está em HomeModule.
No entanto, o primeiro módulo a ser carregado na aplicação é o AppModule, chamado de root module, ou "módulo raiz",
e que, ao ser carregado, carrega todos os módulos necessários.

Já que HomeModule não tinha sido importado nele, em nenhum momento este módulo foi carregado, e por consequência,
o SignInComponent não é disponibilizado. Outra dúvida que pode surgir é em relação ao SignInComponent estar em declarations,
mas não em exports. De que maneira o AppModule teve acesso ao componente?

É necessário incluir em exports apenas aquilo ao que se quer acesso no template de outro componente.
O SignInComponent, como dito anteriormente, tem escopo de página, e portanto nem precisa de um selector. Deste modo,
por não termos que usá-lo em outro componente, para o sistema de módulos, basta que ele seja carregado por meio de um deles.
Apenas configuraremos o que for considerado estritamente necessário.
*/

@NgModule({
    declarations: [
        SignInComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ],
    providers: [
        SignUpService
    ]
})
export class HomeModule {}
