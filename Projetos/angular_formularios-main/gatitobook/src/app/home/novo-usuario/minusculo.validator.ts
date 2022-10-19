import { AbstractControl } from '@angular/forms';

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;
  // se o valor não for o seu valor em minusculo
  if( valor !== valor.toLowerCase()) {
    return { minusculo: true };
  }
  else {
    return null;
  }
}
