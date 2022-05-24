import { TranseferenciaService } from './../services/transeferencia.service';
import { Component, EventEmitter, Output } from "@angular/core";
import { Transferencia } from '../models/transferencia.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.components.scss']
})
export class NovaTransferenciaComponent {

    //@Output() aoTransferir = new EventEmitter<any>();

    valor: number ;
    destino: number ;

    constructor(private transferenciaService: TranseferenciaService,
                private router: Router) {

    }

    transferir() {
        console.log('Solicitado nova transferência');

        // console.log('Valor: ', this.valor);
        // console.log('Destino', this.destino);
        //const valorEmitir = { valor: this.valor, destino: this.destino };
        // this.aoTransferir.emit(valorEmitir);

        const valorEmitir: Transferencia = { valor: this.valor, destino: this.destino };

        this.transferenciaService.adicionar(valorEmitir)
            .subscribe(resultado => {
                console.log(resultado);

                this.limparCampos();

                this.router.navigateByUrl('extrato');
            },
            (error) => console.log(error)
        );
    }

    limparCampos() {
        this.valor = 0;
        this.destino = 0;
    }
}
