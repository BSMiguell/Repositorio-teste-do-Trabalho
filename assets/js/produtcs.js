// Função para lidar com a funcionalidade de filtro
const filterButtons = document.querySelectorAll(".filter-button");
const productBoxes = document.querySelectorAll(".product-box");
const noFavoritesMessage = document.querySelector(".no-favorites-message");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove a classe ativa de todos os botões
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Adiciona a classe ativa ao botão clicado
    button.classList.add("active");

    const category = button.dataset.filter;

    // Filtra os produtos com base na categoria selecionada
    productBoxes.forEach((box) => {
      const productCategory = box.dataset.category;

      if (category === "all" || category === productCategory) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });

    // Oculta a mensagem "Nenhum favorito adicionado"
    if (category !== "favorites") {
      noFavoritesMessage.style.display = "none";
    }
  });
});

// Função para mostrar favoritos
function showFavorites() {
  const articles = document.querySelectorAll(".product-box");
  let favoritesExist = false;

  articles.forEach((article) => {
    if (article.classList.contains("favorite")) {
      article.style.display = "block";
      favoritesExist = true;
    } else {
      article.style.display = "none";
    }
  });

  // Mostra a mensagem "Nenhum favorito adicionado" se nenhum favorito existir
  if (!favoritesExist) {
    noFavoritesMessage.style.display = "block";
  } else {
    noFavoritesMessage.style.display = "none";
  }
}

// Listener de evento para todos os botões de filtro (exceto favoritos)
const nonFavoritesButtons = document.querySelectorAll(
  '.filter-button:not([data-filter="favorites"])'
);
nonFavoritesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Oculta a mensagem "Nenhum favorito adicionado"
    noFavoritesMessage.style.display = "none";
  });
});

// Função para mostrar avaliações
let userTexts = document.getElementsByClassName("user-text");
let userPics = document.getElementsByClassName("user-pic");

function showReview(event) {
  for (let userPic of userPics) {
    userPic.classList.remove("active-pic");
  }
  for (let userText of userTexts) {
    userText.classList.remove("active-text");
  }
  let i = Array.from(userPics).indexOf(event.target);
  userPics[i].classList.add("active-pic");
  userTexts[i].classList.add("active-text");
}

// Funcionalidade de pesquisa
const searchInput = document.querySelector("#search-input");
const productBoxess = document.querySelectorAll(".product-box");

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchValue = removeAccents(searchInput.value.toLowerCase());

  productBoxess.forEach((box) => {
    const productName = removeAccents(
      box.querySelector(".product-title").innerText.toLowerCase()
    );

    if (productName.includes(searchValue)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });

  if (searchValue === "") {
    showProducts();
  }
}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function showProducts() {
  productBoxes.forEach((box) => {
    box.style.display = "block";
  });
}

let container = document.querySelector(".container__input");
let lefticondiv = document.querySelector(".lefticondiv");
let closebtn = document.querySelector("#closeinput");

lefticondiv.addEventListener("click", () => {
  container.classList.toggle("active");
});

closebtn.addEventListener("click", () => {
  document.querySelector("input").value = "";
  showProducts();
});

const heartIcons = document.querySelectorAll(".heart-icon");

heartIcons.forEach((icon) => {
  icon.addEventListener("click", toggleHeart);
  const heartId = icon.dataset.heartId;
  const savedState = localStorage.getItem(`heartState_${heartId}`);
  if (savedState === "filled") {
    icon.classList.add("filled");
    const articleId = icon.parentElement.parentElement.dataset.articleId;
    const article = document.querySelector(
      `article[data-article-id="${articleId}"]`
    );
    article.classList.add("favorite");
  }
});

function toggleHeart(event) {
  const icon = event.target;
  icon.classList.toggle("filled");
  const heartId = icon.dataset.heartId;
  const articleId = icon.parentElement.parentElement.dataset.articleId;
  const currentState = icon.classList.contains("filled") ? "filled" : "empty";
  localStorage.setItem(`heartState_${heartId}`, currentState);
  const article = document.querySelector(
    `article[data-article-id="${articleId}"]`
  );
  if (currentState === "filled") {
    article.classList.add("favorite");
  } else {
    article.classList.remove("favorite");
  }
}

const favoritesButton = document.querySelector('[data-filter="favorites"]');
favoritesButton.addEventListener("click", toggleFavorites);

function toggleFavorites() {
  const articles = document.querySelectorAll(".product-box");
  let favoritesExist = false;

  articles.forEach((article) => {
    if (article.classList.contains("favorite")) {
      article.style.display = "block";
      favoritesExist = true;
    } else {
      article.style.display = "none";
    }
  });

  const noFavoritesMessage = document.querySelector(".no-favorites-message");

  if (favoritesExist) {
    noFavoritesMessage.style.display = "none";
  } else {
    noFavoritesMessage.style.display = "block";
  }
}

/*=============== CART ===============*/

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");
const itemCountElement = document.querySelector(".item-count");
const toCleanButton = document.querySelector(".to-clean");

// ABRIR E FECHAR O CART
cartIcon.addEventListener("click", () => {
  cart.classList.add("active-2");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active-2");
});

// ========================================
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// ========================================
function start() {
  addEvents();
}

// ========================================
function update() {
  addEvents();
  updateTotal();
}

// REMOVER O ITEM DO CART
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Altera a quantidade do item
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_chageitemQuantity);
  });

  // Adicionar o item ao cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Comprar Pedido
  const buy_bnt = document.querySelectorAll(".btn-buy");
  buy_bnt.forEach((btn) => {
    btn.addEventListener("click", handle_buyOrder);
  });

  // Limpar Carrinho
  toCleanButton.addEventListener("click", handle_cleanCart);
}

// ========================================
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // Verifica se o item já foi adicionado
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("Item já adicionado");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Adicionar produto ao carrinho
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
  updateItemCount(); // Atualiza o contador de itens

  if (!cart.classList.contains("active-2")) {
    // Abre o carrinho por 2 segundos somente se não estiver aberto
    cart.classList.add("active-2");
    setTimeout(() => {
      cart.classList.remove("active-2");
    }, 2000);
  }
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
  updateItemCount(); // Atualiza o contador de itens
}

function handle_chageitemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  } else if (this.value > 10) {
    this.value = 10;
  }
  this.value = Math.floor(this.value); // para mantê-lo inteiro

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("Ainda não há pedido a ser feito!\nFaça um pedido primeiro.");
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Seu pedido foi feito com sucesso");
  itemsAdded = [];

  update();
  updateItemCount(); // Atualiza o contador de itens
}

function handle_cleanCart() {
  if (itemsAdded.length <= 0) {
    alert("O carrinho já está vazio");
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  itemsAdded = [];

  update();
  updateItemCount(); // Atualiza o contador de itens
}

// SOMAR E TIRAR O PREÇO
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  total = total.toFixed(2);

  totalElement.innerHTML = "$" + total;
}

function CartBoxComponent(title, price, imgSrc) {
  return `<div class="cart-box">
            <img class="cart-product-img" src="${imgSrc}">
            <div class="cart-info">
              <h4 class="cart-product-title">${title}</h4>
              <p class="cart-price">${price}</p>
              <input class="cart-quantity" type="number" value="1" min="1" max="10">
            </div>
            <i class="bx bxs-trash-alt cart-remove"></i>
          </div>`;
}

function updateItemCount() {
  const itemCount = itemsAdded.length;
  itemCountElement.innerHTML = itemCount;
}
