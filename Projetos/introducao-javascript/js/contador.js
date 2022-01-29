var campoPostagem = document.querySelector("#corpo-postagem");
campoPostagem.addEventListener("input", atualizaCaracteres)

function atualizaCaracteres() {
    
    var postagem = document.querySelector("#corpo-postagem").value;
    console.log(postagem);
    var caracteres = postagem.length;

    var contador = document.querySelector("#numero-caracteres");
    contador.innerHTML = caracteres;
}