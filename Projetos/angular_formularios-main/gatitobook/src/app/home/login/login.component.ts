import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService } from './../../autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario='';
  senha='';

  constructor(private authService: AutenticacaoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService
      .autenticar(this.usuario, this.senha)
      .subscribe(() => {
        this.router.navigate(['animais']);
      },
      (error) => {
        alert('Usuario ou senha invalido');
        console.log(error);
      })
  }
}
