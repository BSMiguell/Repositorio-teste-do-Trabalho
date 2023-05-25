/*=============== NAVBAR ===============*/

const header = document.querySelector("header");

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
});

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*=============== =============== ===============*/

/*=============== THEME-MODE ===============*/

const whiteMode = document.querySelector(".theme-icon");
const body = document.body;
const themeKey = "whiteModeEnabled";

// Verifica se há um valor armazenado
if (localStorage.getItem(themeKey) === "true") {
  body.classList.add("white-mode");
  whiteMode.src = "assets/img/theme/sun.png";
} else {
  body.classList.remove("white-mode");
  whiteMode.src = "assets/img/theme/moon.png";
}

whiteMode.addEventListener("click", function () {
  // Inverte o estado do modo
  const whiteModeEnabled = body.classList.toggle("white-mode");

  // Trocar a imagem do ícone
  if (whiteModeEnabled) {
    whiteMode.src = "assets/img/theme/sun.png";
  } else {
    whiteMode.src = "assets/img/theme/moon.png";
  }

  // Armazena o estado do modo no armazenamento local
  localStorage.setItem(themeKey, whiteModeEnabled);
});

/*=============== =============== ===============*/

/*=============== THE SCRIPT OF PRODUCTS PAGE ===============*/

/*=============== CART ===============*/

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

//=============== ABRIR E FECHAR O CART ================
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
// =============== REMOVER O ITEM DO CART ===============
function addEvents() {
  // REmove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // ALTERA A QUANTIDA DO ITEM
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_chageitemQuantity);
  });

  // ADICONAR O ITEM AO CART
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Comprar Pedido
  const buy_bnt = document.querySelector(".btn-buy");
  buy_bnt.addEventListener("click", handle_buyOrder);
}
// ========================================
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // item identificador já existe
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("Item já Adicionado");
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
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_chageitemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // para mantê-lo inteiro

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("Ainda não há pedido a ser feito!\nFaça um pedido primeiro.;9");
    return;
  }

  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Seu pedido foi feito com sucesso");
  itemsAdded = [];

  update();
}

// =============== SOMAR E TIRAR O PREÇO ===============
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

  // mantém 2 dígitos após a vírgula
  total = total.toFixed(2);
  // ou
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;
}

function CartBoxComponent(title, price, imgSrc) {
  return `
  <div class="cart-box">
    <img
      src=${imgSrc}
      alt=""
      class="cart-img"
    />
    <div  class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <!-- REMOVE CART -->
    <i class="bx bxs-trash-alt cart-remove"></i>
  </div>`;
}
/*=============== =============== ===============*/
