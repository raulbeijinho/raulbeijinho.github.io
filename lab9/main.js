const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartSection = document.getElementById("cart");
const totalCostElement = document.createElement("p");
totalCostElement.id = "total-cost";
document.body.appendChild(totalCostElement); // Adiciona o custo total ao DOM

let totalCost = 0;


function updateTotalCost(amount) {
  totalCost += amount;
  const cartSummaryElement = document.getElementById("custototal");
  cartSummaryElement.innerHTML = `Custo total: ${totalCost.toFixed(2)}€`;
}


addToCartButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    const product = event.target.closest("article");
    const productClone = product.cloneNode(true);
    const priceText = productClone.querySelector(".price").textContent;
    const price = parseFloat(priceText.match(/[\d.]+/)[0]);

    const removeButton = document.createElement("button");
    removeButton.textContent = "- Remover do Cesto";
    removeButton.addEventListener("click", () => {
      cartSection.removeChild(productClone);
      updateTotalCost(-price);
    });

    productClone.querySelector(".add-to-cart").remove();
    productClone.appendChild(removeButton);

    
    cartSection.appendChild(productClone);
    updateTotalCost(price); 
  });
});
