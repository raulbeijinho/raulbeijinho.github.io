function alteraCorPato() {
    const body = document.body;
    const currentColor = body.style.backgroundColor;
    if (currentColor === 'yellow') {
        body.style.backgroundColor = '#f9f9f9'; // Cor original
    } else {
        body.style.backgroundColor = 'yellow'; // Cor amarela
    }
}

const patoText = document.querySelector('#pato');
patoText.addEventListener('click', alteraCorPato);

function mudarTextoMouseOverPato() {
    const patoQuack = document.querySelector('#pato2');
    patoQuack.textContent = "QUACK!";
}

function restaurarTextoMouseOutPato() {
    const patoQuack = document.querySelector('#pato2');
    patoQuack.textContent = "Pato";
}

const patoQuack = document.querySelector('#pato2')
patoQuack.addEventListener('mouseover', mudarTextoMouseOverPato)
patoQuack.addEventListener('mouseout', restaurarTextoMouseOutPato)

function transformToArroz() {

    const allTextElements = document.querySelectorAll('p, h1, h2, span, li');

    allTextElements.forEach(function (element) {
        element.textContent = 'arroz';
    });
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'p' || event.key === 'P') { // 
        transformToArroz(); //
    } 
});








