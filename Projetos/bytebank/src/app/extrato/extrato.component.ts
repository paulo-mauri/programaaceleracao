import { TranseferenciaService } from './../services/transeferencia.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  transferencias: any[];

  counterValue = 0;

  @Input()
  get counter() {
    return this.counterValue;
  }

  @Output() counterChange = new EventEmitter();

  set counter(val) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }

  constructor(private transferenciaService: TranseferenciaService) { }

  ngOnInit(): void {
      this.transferenciaService.todas().subscribe((tranferencias: Transferencia[]) => {
          this.transferencias = tranferencias;
      })
  }

}
