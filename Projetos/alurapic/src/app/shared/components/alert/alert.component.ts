import { AlertService } from './alert.service';
import { Component, Input } from '@angular/core';
import { Alert, AlertType } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000;

    alerts: Alert[] = [];

    constructor(
        private alertService: AlertService) {

        this.alertService
            .getAlert()
            .subscribe( alert => {
                if(!alert) {
                    this.alerts = [];
                    return
                }
                else {
                    this.alerts.push(alert); // faz o push do alert
                    setTimeout(() => {
                        this.removeAlert(alert)  // <= passa a mesma referencia
                    }, this.timeout);
                }
            })

    }

    removeAlert(alertToRemove:Alert) {  // é passado a mesma referência, e depois será filtrado uma lista sem esse alertToRemove (objeto)
        this.alerts = this.alerts.filter(alert => alert != alertToRemove );
        // Cria um novo array no qual esse não tenha nenhum "alertToRemove", se isso retorna false significa que o alertToRemove não vai participar da lista filtrada
    }

    getAlertClass(alert: Alert) {

        if(!alert) return '';

        switch(alert.alerType) {
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';
            default:
                return '';
        }
    }
}
