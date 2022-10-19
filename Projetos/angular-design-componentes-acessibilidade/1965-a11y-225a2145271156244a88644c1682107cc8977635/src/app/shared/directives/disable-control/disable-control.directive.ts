import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]'
})
export class DisableControlDirective implements OnChanges {

  /*
    [03:15] Vou no constructor do meu componente, vou botar private ngControl: NgControl.
      Esse cara quando minha diretiva, vou voltar em app, vou colocar appDisableControl como false.
      Se você olhar aqui, estamos tendo esse erro porque estou usando o nome da diretiva, mas estou passando o valor para uma propriedade dessa diretiva.

    [04:02] Mas eu quero que a propriedade tenha o mesmo nome da minha diretiva, não quero colocar uma diretiva, mas ter que passar a propriedade true ou false.
      Como faço isso? Vou chegar dentro do meu componente, vou dizer que o @input() appDisableControl é o input que vai receber nada, começa como nulo.

    [04:33] Na verdade, esse cara vai ser true ou false. Esse cara vai ser false, padrão false.
      Repare que o nome dessa propriedade é o mesmo nome da diretiva.
      Isso me permite agora, meu código voltou a compilar, porque estou usando a diretiva e ao mesmo tempo como a diretiva é o mesmo nome da propriedade,
      consigo com uma única marcação adicionar a diretiva e a propriedade nova que quero colocar
  */

  @Input() appDisableControl = false;

  constructor(private ngControl: NgControl) {
  }

  /*
  [06:00] Então o que vou fazer? Vou pedir para minha diretiva implementar o OnChanges, a interface OnChanges.
    Deixa eu primeiro liberar um espaço para podermos ver. Vou importar OnChanges, é do pacote angular core, ele pede para implementar um método,
    que é o método ngOnChanges, ele me dá referência a um simple change, e o que vou fazer?

  [06:33] Esse simple change é o seguinte, só lembrando, já falei isso de outros cursos de angular, como interagimos com o onChanges,
    mas recordar é viver. Vou fazer if (changes., e aí boto o nome de qualquer input do meu componente aqui.

  [06:48] Como o nome desse input é disabled control vou colocar aqui appDisableControl. A propriedade quando há uma mudança,
    esse objeto só vai ter a propriedade com o mesmo nome do input que mudou se realmente ele mudou. Se não mudou, o changes não vai ter essa propriedade,
    por isso testo com if. If você tem propriedade, if não tiver, vai ser undefined e não vou entrar aqui dentro.

  */

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.appDisableControl){
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }

}
