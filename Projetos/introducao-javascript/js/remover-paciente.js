var pacientes = document.querySelectorAll(".paciente");

var tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(event){
    // console.log("Fui clicado");
    console.log(event.target);
    console.log(this);
    var alvoEvento = event.target;
    var paiDoAlvo = alvoEvento.parentNode; // TR = paciente = remover

    event.target.parentNode.classList.add("fadeOut");

    setTimeout(function(){
        paiDoAlvo.remove();
    },500);

});

// pacientes.forEach(function(paciente){
//     paciente.addEventListener("dblclick", function(){
//         console.log("fui duplo click");
//         // acesso ao dono do evento acessado atraves da palavra reservada this
//         this.remove(); // this esta atrelado ao paciente que sofreu o duplo click, dono do evento, quem esta escutando o evento, quem foi clicado
//     });
// });