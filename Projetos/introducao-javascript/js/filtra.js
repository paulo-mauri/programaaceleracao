var campoFiltro = document.querySelector("#filtrar-tabela");
// console.log(campoFiltro);

campoFiltro.addEventListener("input",function(){
    // this //dono do evento => campoFiltro
    //console.log(this.value);
    var pacientes = document.querySelectorAll(".paciente");
    //console.log(pacientes);

    if ( this.value.length > 0 ) {
        //console.log("digitado");
        
        for (var index = 0; index < pacientes.length; index++) {
            var paciente = pacientes[index];
            //console.log(paciente);
            var tdNome = paciente.querySelector(".info-nome");
            var nome = tdNome.textContent;
            
            // Expressao Regular      ( valor (palavra)    , "i"-case insensitive "s" case sensitive )  
            var expressao = new RegExp(this.value,"i");

            //console.log(nome);

            if(!expressao.test(nome)) {
                paciente.classList.add("invisivel");
            }
            else {
                paciente.classList.remove("invisivel");
            }

            // // Comparação usando substring
            // var comparavel = nome.substr(0, this.value.length);
            // var comparavelMinusculo = comparavel.toLowerCase();
            // var valorDigitadoMinusculo = this.value.toLowerCase();

            // if (!(valorDigitadoMinusculo == comparavelMinusculo)) {
            //     paciente.classList.add("invisivel");
            // } else{
            //     paciente.classList.remove("invisivel");
            // }

            // if (nome != this.value) {
            //     //console.log("entrou");
            //     paciente.classList.add("esconde");
            //     //console.log(paciente);
            // }
            // else {
            //     paciente.classList.remove("esconde");
            // }
            
        }

    }
    else {
        for (var index = 0; index < pacientes.length; index++) {
            var paciente = pacientes[index];
            paciente.classList.remove("invisivel");
        }
    }
    
    
});