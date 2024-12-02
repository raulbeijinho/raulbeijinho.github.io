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
  price.textContent = `Preço: ${produto.price}€`; // Formatação simples para exibir o preço

  article.appendChild(title);
  article.appendChild(img);
  article.appendChild(description);
  article.appendChild(price);

  return article;
}

document.addEventListener('DOMContentLoaded', function () {
  carregarProdutos(produtos);
});


