import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
      /*
        Por padrão, o Angular entender que você só vai ter uma classe de interceptor. Se você não passar nada e, por exemplo,
        criar outro interceptor para fazer outra coisa na cadeia de requisição, ele não vai registrá-lo, porque você não falou que ele é do tipo multi, ou seja,
        que eu vou ter múltiplos interceptors.
        Então é muito importante essa propriedade de multi: true se eu quiser ter uma cadeia de interceptors.
      */
    }
  ]
})
export class AutenticacaoModule { }
