class NegociacaoService {

    // obterNegociacoesDaSemana(cb) {

    //     let xhr = new XMLHttpRequest();

    //     xhr.open('GET','negociacoes/semana');

    //     xhr.onreadystatechange = () => {
    //         /* estados da requisição
    //         0: requisição ainda não iniciada
    //         1: conexão com o servidor estabelecida
    //         2: requisição recebida
    //         3: processando requisição
    //         4: requisição concluída e a resposta está pronta
    //         */

    //         if(xhr.readyState == 4) {
    //             //http status code = 200    
    //             if(xhr.status == 200) {

    //                 //console.log('Obtendo as negociações do servidor');

    //                 //console.log(JSON.parse(xhr.responseText));

    //                 //callback
    //                 cb(null, JSON.parse(xhr.responseText)
    //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
    //             }
    //             else {
    //                 console.log('Não foi possivel obter as negociações da semana');
    //                 console.log(xhr.responseText);
    //                 // callback
    //                 cb('Não foi possivel obter as negociações da semana', null);

    //             }
    //         }

    //     };

    //     xhr.send();
    // }

    // obterNegociacoesDaSemanaAnterior(cb) {

    //     let xhr = new XMLHttpRequest();

    //     xhr.open('GET','negociacoes/anterior');

    //     xhr.onreadystatechange = () => {
    //         /* estados da requisição
    //         0: requisição ainda não iniciada
    //         1: conexão com o servidor estabelecida
    //         2: requisição recebida
    //         3: processando requisição
    //         4: requisição concluída e a resposta está pronta
    //         */

    //         if(xhr.readyState == 4) {
    //             //http status code = 200    
    //             if(xhr.status == 200) {

    //                 //console.log('Obtendo as negociações do servidor');

    //                 //console.log(JSON.parse(xhr.responseText));

    //                 //callback
    //                 cb(null, JSON.parse(xhr.responseText)
    //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
    //             }
    //             else {
    //                 console.log('Não foi possivel obter as negociações da semana');
    //                 console.log(xhr.responseText);
    //                 // callback
    //                 cb('Não foi possivel obter as negociações da semana anterior', null);

    //             }
    //         }

    //     };

    //     xhr.send();
    // }

    // obterNegociacoesDaSemanaRetrasada(cb) {

    //     let xhr = new XMLHttpRequest();

    //     xhr.open('GET','negociacoes/retrasada');

    //     xhr.onreadystatechange = () => {
    //         /* estados da requisição
    //         0: requisição ainda não iniciada
    //         1: conexão com o servidor estabelecida
    //         2: requisição recebida
    //         3: processando requisição
    //         4: requisição concluída e a resposta está pronta
    //         */

    //         if(xhr.readyState == 4) {
    //             //http status code = 200    
    //             if(xhr.status == 200) {

    //                 //console.log('Obtendo as negociações do servidor');

    //                 //console.log(JSON.parse(xhr.responseText));

    //                 //callback
    //                 cb(null, JSON.parse(xhr.responseText)
    //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
    //             }
    //             else {
    //                 console.log('Não foi possivel obter as negociações da semana retrasada');
    //                 console.log(xhr.responseText);
    //                 // callback
    //                 cb('Não foi possivel obter as negociações da semana retrasada', null);

    //             }
    //         }

    //     };

    //     xhr.send();
    // }

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        // return new Promise((resolve, reject) => {

        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET','negociacoes/semana');

        //     xhr.onreadystatechange = () => {
        //         /* estados da requisição
        //         0: requisição ainda não iniciada
        //         1: conexão com o servidor estabelecida
        //         2: requisição recebida
        //         3: processando requisição
        //         4: requisição concluída e a resposta está pronta
        //         */

        //         if(xhr.readyState == 4) {
        //             //http status code = 200    
        //             if(xhr.status == 200) {

        //                 //console.log('Obtendo as negociações do servidor');

        //                 //console.log(JSON.parse(xhr.responseText));

        //                 // resolve da Promise
        //                 resolve(JSON.parse(xhr.responseText)
        //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                            
        //             }
        //             else {
        //                 console.log('Não foi possivel obter as negociações da semana');
        //                 console.log(xhr.responseText);
        //                 // reject Promise
        //                 reject('Não foi possivel obter as negociações da semana');

        //             }
        //         }

        //     };

        //     xhr.send();
        // });

        return new Promise((resolve,reject) => {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações da semana');
                })
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        // return new Promise((resolve, reject) => {

        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET','negociacoes/anterior');

        //     xhr.onreadystatechange = () => {
        //         /* estados da requisição
        //         0: requisição ainda não iniciada
        //         1: conexão com o servidor estabelecida
        //         2: requisição recebida
        //         3: processando requisição
        //         4: requisição concluída e a resposta está pronta
        //         */

        //         if(xhr.readyState == 4) {
        //             //http status code = 200    
        //             if(xhr.status == 200) {

        //                 //console.log('Obtendo as negociações do servidor');

        //                 //console.log(JSON.parse(xhr.responseText));

        //                 //resolve Promise
        //                 resolve(JSON.parse(xhr.responseText)
        //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                            
        //             }
        //             else {
        //                 console.log('Não foi possivel obter as negociações da semana');
        //                 console.log(xhr.responseText);
        //                 // reject Promise
        //                 reject('Não foi possivel obter as negociações da semana anterior');

        //             }
        //         }

        //     };

        //     xhr.send();
        // });

        return new Promise((resolve,reject) => {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações da semana');
                })
        });
        
    }

    obterNegociacoesDaSemanaRetrasada() {

        // return new Promise((resolve,reject) => {
        //     let xhr = new XMLHttpRequest();

        //     xhr.open('GET','negociacoes/retrasada');
    
        //     xhr.onreadystatechange = () => {
        //         /* estados da requisição
        //         0: requisição ainda não iniciada
        //         1: conexão com o servidor estabelecida
        //         2: requisição recebida
        //         3: processando requisição
        //         4: requisição concluída e a resposta está pronta
        //         */
    
        //         if(xhr.readyState == 4) {
        //             //http status code = 200    
        //             if(xhr.status == 200) {
    
        //                 //console.log('Obtendo as negociações do servidor');
    
        //                 //console.log(JSON.parse(xhr.responseText));
    
        //                 //resolve Promise
        //                 resolve(JSON.parse(xhr.responseText)
        //                     .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                            
        //             }
        //             else {
        //                 console.log('Não foi possivel obter as negociações da semana retrasada');
        //                 console.log(xhr.responseText);
        //                 // reject Promise
        //                 reject('Não foi possivel obter as negociações da semana retrasada');
    
        //             }
        //         }
    
        //     };
    
        //     xhr.send();
        // });
       
        return new Promise((resolve,reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possivel obter as negociações da semana');
                })
        });
    }
    
}