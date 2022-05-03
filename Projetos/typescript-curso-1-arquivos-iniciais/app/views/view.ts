export abstract class View<T> {
    protected elemento: HTMLElement; // só a classe pai tem acesso a propriedade, 
                                     //   mas as classes filhas que herdam tem acesso (mas sem poder alterar) 
    private escapar = false;

    constructor(seletor: string, escapar?: boolean) {
        const elemento = document.querySelector(seletor); 
        if (elemento) {
            //this.elemento = document.querySelector(seletor);
            this.elemento = elemento as HTMLElement;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
        if(escapar) {
            this.escapar = escapar;
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/,'');
        }
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string; // somente o pai e filhos tem acesso ao metodo.

}