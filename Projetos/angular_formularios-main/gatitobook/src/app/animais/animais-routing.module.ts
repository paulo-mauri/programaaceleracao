import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';

const routes: Routes = [
  {
    path:'',
    component: ListaAnimaisComponent,
    resolve: {
      animais: ListaAnimaisResolver   //  Agora vamos configurar a nossa rota para ele chamar esse resolver quando o usuário for para a rota. Vamos lá no arquivo “animais-routing.module.ts”.
                                        // E aqui na lista de animais nós vamos utilizar não o guard e sim a propriedade resolve. E esse resolve recebe um objeto.

                                      // E aqui, diferente de receber lá o array ou somente o resolve, eu preciso atribuir esse resolve a uma variável,
                                        // no caso, eu vou chamar essa variável de animais:, que vai ser a ListaAnimaisResolver.

                                      // O que isso significa? Que ele vai resolver – até o nome, resolve – mas ele vai fazer a busca no back-end,
                                        // trazer o observable, retirar a informação do observable e colocar aqui na variável animais.
                                        // E com isso nós temos o acesso a isso antes do componente ser renderizado.
    }
  },
  {
    path: 'novo',
    component: NovoAnimalComponent
  },
  {
    path:':animalId',
    component: DetalheAnimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
