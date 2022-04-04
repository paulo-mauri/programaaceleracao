import { UsuarioViewModel } from './../ViewModel/UsuarioViewModel';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  public usuarios: Array<UsuarioViewModel>;

  ngOnInit() {
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
                       .subscribe((res:Array<UsuarioViewModel>) => {
                         this.usuarios = res;
                         //console.log(res);
                       });
  }

}
