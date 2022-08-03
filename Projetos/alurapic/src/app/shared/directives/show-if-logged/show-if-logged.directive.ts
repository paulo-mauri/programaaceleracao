import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

import { UserService } from './../../../core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ) { }

    ngOnInit(): void {

        // get o current display (css) do elemento nativo
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;

        // obtem o usuario
        this.userService
            .getUser()
            .subscribe(user => {
                if(user) {
                    this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
                }
                else {
                    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            });
    }
}
