import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-excluir-usuario',
  templateUrl: './excluir-usuario.component.html',
  styleUrls: ['./excluir-usuario.component.scss']
})
export class ExcluirUsuarioComponent implements OnInit {

  id: any;
  nome: any;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') == null ? 0 : this.activatedRoute.snapshot.paramMap.get('id');

    this.nome = this.activatedRoute.snapshot.paramMap.get('nome') == null ? '' : this.activatedRoute.snapshot.paramMap.get('nome');
  }

  ngOnInit() {

  }

  deleteUsuario() {
    this.usuarioService.deleteUsurio(this.id)
                          .subscribe((res) => {
                              this.router.navigate(['/usuario']);
    })
  }

}
