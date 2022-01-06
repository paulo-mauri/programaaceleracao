var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    var form = document.querySelector("#form-adiciona");

    // Extraindo informações do paciente do form
    var paciente = obtemPacienteFormulario(form);

    //console.log(pacienteTr);
    var erros = validaPaciente(paciente);

    if(erros.length > 0) {
        console.log(erros);
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagemErro = document.querySelector("#mensagens-erro");
    mensagemErro.innerHTML = "";
    
});

function adicionaPacienteNaTabela(paciente) {

        // cria td e tr do paciente
        var pacienteTr = montaTr(paciente);

        var tabela = document.querySelector("#tabela-pacientes");
        tabela.appendChild(pacienteTr);
}

function obtemPacienteFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };

    // console.log(form.altura.value);
    // console.log(form.peso.value);
    // var nome  = form.nome.value;
    // var peso = form.peso.value;
    // var altura = form.altura.value;
    // var gordura = form.gordura.value;

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    //console.log(pacienteTr);

    pacienteTr.appendChild( montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild( montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild( montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild( montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild( montaTd(paciente.imc, "info-imc"));

    return pacienteTr;

}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if(paciente.nome.length == 0 ) {
        erros.push("O nome não pode ser em branco");
    }
    
    if(!validaPeso(paciente.peso)) {
        erros.push("O peso é inválido.");
    }

    if(!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida.");
    }
    
    if(paciente.gordura.length == 0) {
        erros.push("A gordura do paciente não pode ser em branco");
    }

    if(paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if(paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }
    return erros;
}

function exibeMensagens_DeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    console.log(ul);                                  
    console.log(erros);
    ul.innerHTML = "";
    for (let index = 0; index < erros.length; index++) {
        console.log(index);
        var erro = erros[index];
        console.log(erros[index]);
        ul.appendChild(montaLi(erro));
    }
    console.log("saiu");
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function montaLi(erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    li.classList.add("mensagens-erro")
    return li;
}
