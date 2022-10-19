import { Usuario } from './../../autenticacao/usuario/usuario';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  user$ = this.usuarioService.retornaUsuario();

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }





}
