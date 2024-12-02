function carregarProdutos(produtos) {
    produtos.forEach(produto => {
        console.log(`ID: ${produto.id}, Título: ${produto.title}`);
    });
  }

function criarProduto(produto) {
    
}
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos(produtos);
  });


  