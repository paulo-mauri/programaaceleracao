// Decorator de propriedade
// aplicado assim que a classe é aplicado
export function domInjector(seletor: string) {
    return function(target: any,            // se for colocado em propriedade estatica de classe retorna a função construtora da classe
                                            // se for colocado em propriedade de instancia da classe retorna o prototype da classe
                    propertyKey: string) {
        console.log(`modificando o prototype ${target.constructor.name}
                    e adicionando o getter para a propriedade ${propertyKey}`);
        let elemento: HTMLElement;
        const getter = function() {
            if (!elemento) {
                elemento = <HTMLElement> document.querySelector(seletor);
                console.log(`buncando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
            }
            return elemento;
        }
        Object.defineProperty(
            target, 
            propertyKey,    // para esta propriedade em questão cria o get para a propriedade
            { get: getter }
        )
    }
}