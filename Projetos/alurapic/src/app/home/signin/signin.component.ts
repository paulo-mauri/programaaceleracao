import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';

@Component({
    //selector: // componente de pagina não precisa do selector
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit, AfterViewInit {

    /*
    Para a declaração de variáveis não inicializadas no construtor (como o loginForm),
    o problema é que mesmo que o compilador não saiba, nós sabemos que ela vai ser inicializada no ngOnInit.
    Nesse caso basta acrescentar uma exclamação logo após o nome da variável em sua declaração
    */
    loginForm!: FormGroup;

    @ViewChild('userNameInput')
    userNameInput!: ElementRef<HTMLInputElement>;

    fromUrl: string;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private platformDetectorService: PlatformDetectorService,
                private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.activatedRoute.queryParams
            .subscribe(params => {
                this.fromUrl = params['fromUrl'];
            })
    }

    ngAfterViewInit(): void {
        this.platformDetectorService.isPlatformBrowser() &&     // instrução em javascript, se a primeira for verdadeira executa a segunda instrução
        this.userNameInput.nativeElement.focus();
    }

    login() {

        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;

        this.authService
            .authenticate(username, password)
            .subscribe(
                () => {
                    this.fromUrl
                        ? this.router.navigateByUrl(this.fromUrl)
                        : this.router.navigate(['user', username]) // o angular monta a url /user/username
                },
                (err) => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() &&     // instrução em javascript, se a primeira for verdadeira executa a segunda instrução
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password')
                }
            );
    }

}
