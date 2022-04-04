import { Router, Routes } from '@angular/router';
import { UsuarioViewModel } from './../ViewModel/UsuarioViewModel';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.scss']
})
export class AdicionarUsuarioComponent implements OnInit {

  public form: FormGroup;

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(),
      email: new FormControl(),
      data: new FormControl(),
      ativo: new FormControl(),
    });
  }

  Salvar() {
    const objUsuario = new UsuarioViewModel();

    objUsuario.nome = this.form.get('nome')?.value;
    objUsuario.email = this.form.get('email')?.value;
    objUsuario.dataNascimento = this.form.get('data')?.value;
    objUsuario.ativo = this.form.get('ativo')?.value;

    this.usuarioService.addUsuario(objUsuario).subscribe(res => {
      this.router.navigate(['/usuario']);
    });
  }
}
