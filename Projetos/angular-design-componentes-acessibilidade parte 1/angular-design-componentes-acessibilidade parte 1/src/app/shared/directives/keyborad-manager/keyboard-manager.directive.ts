import { KeyboardManagedItemDirective } from './keyboard-managed-item.directive';
import { ContentChildren, Directive, HostListener, QueryList } from '@angular/core';

@Directive({
  selector: '[appKm]'
})
export class KeyboardManagerDirective {

  constructor(){

  }

  /*
    [04:10] Vou utilizar o decorator ContentChildren. Esse ContentChildren vai pegar todo mundo que está dentro, é um conteúdo do elemento no qual a diretiva faz parte.
        Mas qual children? Qual o tipo? Quero injetar do tipo KeyboardManagedItemDirective, que vou chamar esse cara de public items.

    [04:58] E qual vai ser o tipo? Esse tipo vai ser um QueryList do angular. Vou importar. Do tipo KeyboardManagedItemDirective, que vai começar de nulo.
      “Flávio, tem como você recapitular isso para mim?”, tem. O ContentChildren vai fazer o seguinte.
      Busca todo mundo que é filho do elemento no qual a diretiva KeyboardManagerDirective faz parte, pega todos esses filhos e traz para mim apenas aqueles que
      têm a diretiva KeyboardManagedItemDirective.

    [05:40] Em outras palavras, estou dizendo “injeta todo mundo da diretiva KeyboardManagedItemDirective dentro do meu KeyboardManagedDirective.
        E o que é uma QueryList do angular? Essa QueryList é muito bonita, essa QueryList vai ter uma lista com uma referência de todas essas
        diretivas que ele encontrar, no caso só temos dois botões, o button yes e o button no.

    [06:05] Então sabemos que essa lista vai ter dois itens, mas a beleza da QueryList é que se você tem um conteúdo dinâmico, se alguém adiciona um
        novo item ou você está usando ngFor para gerar dinamicamente itens, essa QueryList é atualizada dinamicamente.

    [06:22] Por exemplo, tenho dois botões, se por acaso tenho alguma lógica que apaga um botão, essa lista agora vai ser atualizada dinamicamente
        para conter só um item. É como se fosse, eu não queria fazer essa comparação, mutation observer, do html.

    [06:44] Como eu pego esse cara? Como consigo fazer isso? Vou provar para vocês que peguei. Quando apertar meu ArrowUp vou dar console.log(this.items),
        para podermos ver se estamos pegando realmente o cara. Vou salvar. Deixa eu salvar meu yes-no-button que não tinha salvo, com a adição dessas duas diretivas.

  */
  @ContentChildren(KeyboardManagedItemDirective) public items: QueryList<KeyboardManagedItemDirective> = null;
  @HostListener('keyup',['$event'])
  public manageKeys(event: KeyboardEvent): void {
    switch(event.key) {
      case 'ArrowUp':
        console.log('up');
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
      case 'ArrowDown':
        console.log('down');
        this.moveFocus(ArrowDirection.LEFT).focus();
        break;
      case 'ArrowLeft':
          console.log('left');
          this.moveFocus(ArrowDirection.LEFT).focus();
          break;
      case 'ArrowRight':
        console.log('right');
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagedItemDirective {
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];
    if (targetElementFocus) {
      return targetElementFocus;
    }

    return direction === ArrowDirection.LEFT
      ? items[items.length - 1]
      : items[0]
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
}
