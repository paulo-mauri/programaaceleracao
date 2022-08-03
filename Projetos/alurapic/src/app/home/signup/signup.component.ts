import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NewUSer } from './new-user';
import { lowerCaseValidator } from 'src/app/shared/Validators/lower.case.validator';
import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password.validator';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit, AfterViewInit {

    signupForm: FormGroup;

    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService ) {

    }

    ngOnInit(): void {

        this.signupForm = this.formBuilder.group({
            email: ['',
            [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
            [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(40)
            ]
        ],
        userName: ['',                      // parametro 1 = Valor padrão
        [                               // parametro 2 = Validadores sincronos
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotTakenValidatorService.checkUserNameTaken()   // parametro 3 = Validadores Assíncronos
            ],
            password: ['',
            [
                Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        }, {
            validators: [ userNamePassword ]  // VALIDAÇÕES CROSSFIELDS
        });

    }

    ngAfterViewInit(): void {
        this.platformDetectorService.isPlatformBrowser() &&     // instrução em javascript, se a primeira for verdadeira executa a segunda instrução
        this.emailInput.nativeElement.focus();
    }

    signUp() {

        // só vai fazer o submit se o form é valido E não tem nada pendente
        if (this.signupForm.valid && !this.signupForm.pending) {

            const newUser = this.signupForm.getRawValue() as NewUSer; // retorna objeto javascript com as propriedades e valores do formulário

            this.signUpService
            .signUp(newUser)
                .subscribe(
                    () => this.router.navigate(['']),
                    err => console.log(err)
                );
        }

    }

}
