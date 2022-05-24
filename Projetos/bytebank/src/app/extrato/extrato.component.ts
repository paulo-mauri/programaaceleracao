import { TranseferenciaService } from './../services/transeferencia.service';
import { Component, Input, OnInit } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  transferencias: any[];

  constructor(private transferenciaService: TranseferenciaService) { }

  ngOnInit(): void {
      this.transferenciaService.todas().subscribe((tranferencias: Transferencia[]) => {
          this.transferencias = tranferencias;
      })
  }

}
