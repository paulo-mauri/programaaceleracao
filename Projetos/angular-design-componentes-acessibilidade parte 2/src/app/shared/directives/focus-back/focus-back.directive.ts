import { Directive, OnDestroy, OnInit } from '@angular/core';


@Directive({
  selector: '[appFocusBack]'
})
export class FocusBackDirective implements OnInit, OnDestroy {

  private lastFocusedElement: Element;

  ngOnInit(): void {
    this.lastFocusedElement = document.activeElement;
                             // Nos dá uma referência para o elemento com focus dentro do documento (página) exibida.
                             // sempre aponta para o elemento do DOM atualmente focado na página.
  }

  ngOnDestroy(): void {
    if(this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }

}
