let counter = 0;
function count() {
    document.querySelector('#contador').innerHTML = ++counter;
}
    document.querySelector('button').onclick = count;

function mudarTextoMouseOver() {
    const texto = document.getElementById("texto");
    texto.textContent = "1. Obrigado por passares!";
}


function restaurarTextoMouseOut() {
    const texto = document.getElementById("texto");
    texto.textContent = "1. Passa por aqui!";
}

function mudarCorTexto(cor) {
    const textocor = document.getElementById("textocor");
    textocor.style.color = cor;
}


const texto = document.getElementById("texto");
const redButton = document.getElementById("red");
const greenButton = document.getElementById("green");
const blueButton = document.getElementById("blue");


texto.addEventListener("mouseover", mudarTextoMouseOver);
texto.addEventListener("mouseout", restaurarTextoMouseOut);


redButton.addEventListener("click", () => mudarCorTexto("red"));
greenButton.addEventListener("click", () => mudarCorTexto("green"));
blueButton.addEventListener("click", () => mudarCorTexto("blue"));


function gerarCorAleatoria() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function alterarCorDeFundo() {
    
    const escrever = document.getElementById("caixaTexto");
    
    
    escrever.style.backgroundColor = gerarCorAleatoria();
}


document.getElementById("caixaTexto").addEventListener("input", alterarCorDeFundo);

