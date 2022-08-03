
export class Alert {
    constructor(
        public readonly alerType: AlertType,
        public readonly message: string
        ) { }

}

export enum AlertType {

    SUCCESS,
    WARNING,
    DANGER,
    INFO
}
