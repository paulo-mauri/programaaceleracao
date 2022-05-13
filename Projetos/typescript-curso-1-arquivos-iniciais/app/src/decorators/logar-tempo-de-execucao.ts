export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any,                        // função static pode ser o construtor, funcao normal referencia do prototype
        propertyKey: string,                // nome do metodo como string que foi decorado
        descriptor: PropertyDescriptor      // referencia ao metodo original
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) {
            let divisor = 1;
            let unidade = 'milisegundos';
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            // chamar o metodo original
            const retorno = metodoOriginal.apply(this, args); // this é o contexto, args são os parametros
                                                              // this -> instancia que esta executando o metodo no momento
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}`);
            retorno
        }
        return descriptor;
    }
}