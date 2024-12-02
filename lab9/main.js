if (!localStorage.getItem('produtos-selecionados')) {

  localStorage.setItem('produtos-selecionados', JSON.stringify([]));

}

function carregarProdutos(produtos) {

  const produtosSection = document.querySelector('#produtos');

  produtosSection.innerHTML = '';

  produtos.forEach(produto => {
    const article = criarProduto(produto);
    if (article) {
      produtosSection.appendChild(article);
    }
  });
}

function criarProduto(produto) {

  const article = document.createElement('article');

  const title = document.createElement('h3');
  title.textContent = produto.title;

  const img = document.createElement('img');
  img.src = produto.image;
  img.alt = produto.title;

  const description = document.createElement('p');
  description.textContent = produto.description;

  const price = document.createElement('span');
  price.textContent = `Preço: ${produto.price}€`;

  const button = document.createElement('button');
  button.textContent = "+ Adicionar ao Cesto";
  button.classList.add('add-to-cart');

  button.addEventListener('click', function () {
    let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));

    if (!produtosSelecionados) {
      produtosSelecionados = [];
    }

    produtosSelecionados.push(produto);

    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    atualizaCesto();
  });

  article.appendChild(title);
  article.appendChild(img);
  article.appendChild(description);
  article.appendChild(price);
  article.appendChild(button);

  return article;
}

function atualizaCesto() {

  const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];


  const carrinhoSection = document.querySelector('#cart');


  carrinhoSection.innerHTML = '';


  produtosSelecionados.forEach(produto => {

    const artigo = criaProdutoCesto(produto);


    if (artigo) {
      carrinhoSection.appendChild(artigo);
    }
  });

  const totalPrice = produtosSelecionados.reduce((total, produto) => total + produto.price, 0);

  const custoTotal = document.querySelector('#custototal');
  custoTotal.textContent = `Custo total: ${totalPrice.toFixed(2)}€`;
}

function criaProdutoCesto(produto) {

  const article = document.createElement('article');
  article.classList.add('cart-item');


  const title = document.createElement('h4');
  title.textContent = produto.title;
  article.appendChild(title);


  const price = document.createElement('p');
  price.textContent = `Preço: ${produto.price}€`;
  article.appendChild(price);

  const img = document.createElement('img');
  img.src = produto.image;
  img.alt = produto.title;
  article.appendChild(img);


  const removeButton = document.createElement('button');
  removeButton.textContent = "Remover";
  removeButton.classList.add('remove-from-cart');
  article.appendChild(removeButton);

  removeButton.addEventListener('click', function () {
    let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    produtosSelecionados = produtosSelecionados.filter(p => p.title !== produto.title);

    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

    atualizaCesto();
  });

  return article;
}

document.addEventListener('DOMContentLoaded', function () {
  carregarProdutos(produtos);
  atualizaCesto();
});




