export function domInjector(seletor) {
    return function (target, propertyKey) {
        console.log(`modificando o prototype ${target.constructor.name}
                    e adicionando o getter para a propriedade ${propertyKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(seletor);
                console.log(`buncando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
//# sourceMappingURL=dom-injector.js.map