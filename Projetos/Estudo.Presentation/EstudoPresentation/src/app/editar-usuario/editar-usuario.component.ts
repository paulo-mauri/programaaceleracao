import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioViewModel } from '../ViewModel/UsuarioViewModel';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit, AfterViewInit {

  public form: FormGroup;

  public id: any;

  public usuarioViewModel: UsuarioViewModel;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') == null ? 0 : this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngAfterViewInit(): void {

    // this.form = new FormGroup({
    //   nome: new FormControl(res.nome),
    //   email: new FormControl(res.email),
    //   data: new FormControl(res.dataNascimento),
    //   ativo: new FormControl(res.ativo),
    // });

    this.usuarioService.getUsuario(this.id)
                        .pipe(take(1))
                        .subscribe(res => {
                          this.form.get('nome')?.setValue(res.nome),
                          this.form.get('email')?.setValue(res.email),
                          //this.form.get('data')?.setValue(res.dataNascimento),
                          this.form.get('data')?.setValue(new DatePipe('en-US').transform(res.dataNascimento,'yyyy-MM-dd')),
                          this.form.get('ativo')?.setValue(res.ativo)
                        });
  }

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

    objUsuario.id = this.id;
    objUsuario.nome = this.form.get('nome')?.value;
    objUsuario.email = this.form.get('email')?.value;
    objUsuario.dataNascimento = this.form.get('data')?.value;
    objUsuario.ativo = this.form.get('ativo')?.value;

    this.usuarioService.updateUsuario(objUsuario).subscribe(res => {
      this.router.navigate(['/usuario']);
    });
  }

}
