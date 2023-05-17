// Define uma variável global para armazenar o estado do alerta
var isAlertVisible = false;
fetch("json/produto.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    let placeholder = document.querySelector("#produtos");
    let out = "";
    let count = 0;
    for (let product of products) {
      out += `
        <div class="pro">
        <a href="${product.imagem.link}"><img src="${product.imagem.src}" alt="${product.titulo}"></a>
          <div class="des">
            <span class="marca">${product.editora}</span>
            <span class="marca">${product.data_lancamento}</span>
            <h3>${product.titulo}</h3>
            <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </div>  
            <span>R$${product.preco}</span>
          </div>
          <a class="add-to-cart"><i class="fal fa-shopping-cart cart"></i></a>
        </div>
      `;
      count++;
      if (count % 4 == 0) {
        out += `<div style="clear:both;"></div>`;
      }
    }

    placeholder.innerHTML = out;

    // Seleciona todos os botões "Adicionar ao carrinho"
    var addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Adiciona um evento de clique a todos os botões
    addToCartButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Verifica se o alerta já está visível
        if (!isAlertVisible) {
          // Cria um elemento de div para o alerta
          var alertBox = document.createElement("div");
          alertBox.classList.add("my-alert");

          // Adiciona uma mensagem ao alerta
          var message = document.createTextNode(
            "Produto adicionado ao carrinho!"
          );
          alertBox.appendChild(message);

          // Adiciona o alerta à página
          var container = document.querySelector(".pro-container");
          container.appendChild(alertBox);

          // Cria um novo elemento de div para o item adicionado ao carrinho
          var cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.innerText =
            this.previousElementSibling.previousElementSibling.textContent;

          // Cria um botão de "remover" para o item
          var removeButton = document.createElement("button");
          removeButton.classList.add("remove-item");
          removeButton.innerText = "Volume de Jusutsu Adionado X";

          // Adiciona um evento de clique ao botão de "remover"
          removeButton.addEventListener("click", function () {
            // Remove o item do carrinho
            cartItem.remove();
          });

          // Adiciona o botão de "remover" ao item do carrinho
          cartItem.appendChild(removeButton);

          // Adiciona o item ao carrinho
          var cartItemsDiv = document.querySelector(".cart-items");
          cartItemsDiv.appendChild(cartItem);

          // Define a variável de estado do alerta como true
          isAlertVisible = true;

          // Define um tempo limite para o alerta
          setTimeout(function () {
            alertBox.remove();
            isAlertVisible = false;
          }, 3000);
        }
      });
    });
  });

// Abre e fecha o carrinho
const cartOpenIcon = document.querySelector(".cart__open");
const cartRemoveIcon = document.querySelector(".cart__remove");
const cartItems = document.querySelector(".cart-items");

cartOpenIcon.addEventListener("click", () => {
  cartItems.style.display = "block";
});

cartRemoveIcon.addEventListener("click", () => {
  cartItems.style.display = "none";
});
