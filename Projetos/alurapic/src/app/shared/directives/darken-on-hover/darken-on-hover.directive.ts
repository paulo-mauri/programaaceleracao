import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%';

    constructor(
        private el: ElementRef,
        private render: Renderer2) {} // injetado el - elemento do DOM

    @HostListener('mouseover')
    darkenOn() {
        //console.log('teste');
        this.render.setStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setStyle(this.el.nativeElement, 'filter', 'brightness(100%)');    }
}
