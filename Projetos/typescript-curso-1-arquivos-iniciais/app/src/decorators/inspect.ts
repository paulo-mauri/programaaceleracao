// exemplo ESQUELETO
// export function inspect() {
//     return function(
//         target: any,         // metodo estatico retorna o constructor, metodo de instancia é o prototype
//         propertyKey: string, // nome do metodo
//         descriptor: PropertyDescriptor // referencia ao metodo original
//     ) {
//         const metodoOriginal = descriptor.value; 
//         descriptor.value = function (...args: any[]) {
//             console.log(`--- Método ${propertyKey}`);
//             console.log(`----- parâmetros ${JSON.stringify(args)}`);
//             const retorno = metodoOriginal.apply(this, args);   // apply é chamada do metodo original que quer executar no contexot de this
//                                                                 // this é o contexto da nova função que foi adicionada ao descriptor.value
//             console.log(`----- retorno ${JSON.stringify(retorno)}`);                                                                
//             return retorno;
//         }
//         return descriptor;
//     }
// }

export function inspect(
        target: any,         // metodo estatico retorna o constructor, metodo de instancia é o prototype
        propertyKey: string, // nome do metodo
        descriptor: PropertyDescriptor // referencia ao metodo original
    ) {
        const metodoOriginal = descriptor.value; 
        descriptor.value = function (...args: any[]) {
            console.log(`--- Método ${propertyKey}`);
            console.log(`----- parâmetros ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this, args);   // apply é chamada do metodo original que quer executar no contexot de this
                                                                // this é o contexto da nova função que foi adicionada ao descriptor.value
                                                                // this -> instancia que esta executando o metodo no momento
            console.log(`----- retorno ${JSON.stringify(retorno)}`);                                                                
            return retorno;
        }
        return descriptor;
    }
