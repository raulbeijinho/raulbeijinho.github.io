let produtosList = [];
let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

const produtosSection = document.querySelector('#produtos');
const carrinhoSection = document.querySelector('#cart');
const custoTotal = document.querySelector('#custototal');

const apiURL = 'https://deisishop.pythonanywhere.com/products/';
const categoriasURL = 'https://deisishop.pythonanywhere.com/categories/';
const checkoutURL = 'https://deisishop.pythonanywhere.com/buy/';


function buscarProdutos() {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((produtos) => {
      produtosList = produtos;

      carregarProdutos(produtosList);
    })
    .catch((error) => {
      console.error('Erro ao buscar produtos:', error);
    });
}

function buscarCategorias() {
  fetch(categoriasURL)
    .then((response) => {
      return response.json();
    })
    .then((categorias) => {
      carregarCategorias(categorias);
    })
    .catch((error) => {
      console.error('Erro ao buscar categorias:', error);
    });
}

function carregarCategorias(categorias) {
  const categorySelect = document.querySelector('#categorias');
  categorySelect.innerHTML = '<option value="">Todas as Categorias</option>'; // Opção padrão

  categorias.forEach((categoria) => {
    const option = document.createElement('option');
    option.value = categoria; // Usamos a própria string como valor
    option.textContent = categoria; // Nome da categoria
    categorySelect.append(option);
  });
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

function filtrarProdutosPorCategoria(categoriaSelecionada) {
  let produtosFiltrados;

  if (categoriaSelecionada) {
    produtosFiltrados = produtosList.filter((produto) => produto.category === categoriaSelecionada);
  } else {
    produtosFiltrados = produtosList;
  }

  carregarProdutos(produtosFiltrados);
}

document.querySelector('#categorias').addEventListener('change', (event) => {
  const categoriaSelecionada = event.target.value;
  filtrarProdutosPorCategoria(categoriaSelecionada);
});

function ordenarProdutosPorPreco(ordem) {
  let produtosOrdenados;

  if (ordem === 'crescente') {
    produtosOrdenados = produtosList.sort((a, b) => a.price - b.price);
  } else if (ordem === 'decrescente') {
    produtosOrdenados = produtosList.sort((a, b) => b.price - a.price);
  } else {
    produtosOrdenados = produtosList;
  }

  carregarProdutos(produtosOrdenados);
}

document.querySelector('#ordenar').addEventListener('change', function (event) {
  const ordem = event.target.value;
  ordenarProdutosPorPreco(ordem);
});

function pesquisarProdutos(termoPesquisa) {
  const produtosFiltrados = produtosList.filter(produto =>
    produto.title.toLowerCase().includes(termoPesquisa)
  );

  carregarProdutos(produtosFiltrados);
}

document.querySelector('#procurar').addEventListener('input', function (event) {
  const termoPesquisa = event.target.value.toLowerCase();
  pesquisarProdutos(termoPesquisa);
});

function finalizarCompra() {
  const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
  if (produtosSelecionados.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }

  const isEstudante = document.getElementById('estudanteDeisi').checked;  // Corrigido para isEstudante
  const cupaoDesconto = document.getElementById('desconto').value.trim();  // Corrigido para cupaoDesconto

  console.log(isEstudante);  
  console.log(cupaoDesconto);  

  const checkoutData = {
    student: isEstudante,
    coupon: cupaoDesconto || null,
    products: produtosSelecionados.map((produto) => produto.id),
  };

  const checkoutSection = document.querySelector('#checkout');

  let mensagemFinal = document.querySelector('#mensagem-final');
  if (!mensagemFinal) {
    mensagemFinal = document.createElement('p');
    mensagemFinal.id = 'mensagem-final';
    checkoutSection.appendChild(mensagemFinal);
  }

  fetch(checkoutURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro no processo de compra. Por favor, tente novamente.");
    }
    return response.json();
  })
  .then((dados) => {
    mensagemFinal.innerHTML = `
      Valor final a pagar (com eventuais descontos): <strong>${parseFloat(dados.totalCost).toFixed(2)} €</strong><br>
      Referência de pagamento: <strong>${dados.paymentReference}</strong>
    `;
    
    atualizaCesto();
  })
  .catch((error) => {
    console.error("Erro durante o checkout:", error);
    mensagemFinal.textContent = "Ocorreu um erro ao finalizar a compra. Por favor, tente novamente.";
  });
}

document.querySelector('.comprar').addEventListener('click', finalizarCompra);


document.addEventListener('DOMContentLoaded', function () {
  buscarProdutos();
  buscarCategorias();
  atualizaCesto();
});




