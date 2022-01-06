var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
    console.log("Buscando pacientes...");

    var xhr = new XMLHttpRequest();
    // https://api-pacientes.herokuapp.com/pacientes

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load",function(){

        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200 ) {

            erroAjax.classList.add("invisivel");
            // console.log(xhr.responseText);
            var resposta = xhr.responseText;
            console.log(resposta);
            var pacientes = JSON.parse(resposta);
            console.log(pacientes);
            console.log(typeof pacientes);
            
            pacientes.forEach(element => {
                adicionaPacienteNaTabela(element);            
            });
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();

});