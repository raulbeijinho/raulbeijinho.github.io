let counter = 0;
function count() {
    document.querySelector('#contador').innerHTML = ++counter;
}
    document.querySelector('#countButton').onclick = count;

    function mudarTextoMouseOver() {
        const texto = document.querySelector("#texto");
        texto.textContent = "1. Obrigado por passares!";
    }
    
    function restaurarTextoMouseOut() {
        const texto = document.querySelector("#texto");
        texto.textContent = "1. Passa por aqui!";
    }
    
    function mudarCorTexto(cor) {
        const textocor = document.querySelector("#textocor");
        textocor.style.color = cor;
    }
    
    const texto = document.querySelector("#texto");
    const redButton = document.querySelector("#red");
    const greenButton = document.querySelector("#green");
    const blueButton = document.querySelector("#blue");
    
    texto.addEventListener("mouseover", mudarTextoMouseOver);
    texto.addEventListener("mouseout", restaurarTextoMouseOut);
    
    redButton.addEventListener("click", () => mudarCorTexto("red"));
    greenButton.addEventListener("click", () => mudarCorTexto("green"));
    blueButton.addEventListener("click", () => mudarCorTexto("blue"));
    
    function gerarCorAleatoria() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    
    function alterarCorDeFundo() {
        const escrever = document.querySelector("#caixaTexto");
        escrever.style.backgroundColor = gerarCorAleatoria();
    }
    
    document.querySelector("#caixaTexto").addEventListener("input", alterarCorDeFundo);

    function alterarCorDeFundo() {
        const caixaTexto = document.querySelector("#caixaCorIngles");
        const cor = caixaTexto.value.trim(); 
        document.body.style.backgroundColor = cor; 
    }

    document.querySelector("#submitButton").addEventListener("click", alterarCorDeFundo);
