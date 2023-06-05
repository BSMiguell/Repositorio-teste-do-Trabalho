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

/*=============== THEME/COLOR - MODE ===============*/

// Obtém o elemento de alternância do seletor de estilo
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

styleSwitcherToggle.addEventListener("click", () => {
  styleSwitcher.classList.toggle("open");

  // Adicionar ou remover a classe "stop-rotation" no ícone da engrenagem
  const gearIcon = document.querySelector(".style-switcher-toggler .fa-cog");
  gearIcon.classList.toggle("stop-rotation");
});

window.addEventListener("scroll", () => {
  if (styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");

    // Remover a classe "stop-rotation" quando o seletor de estilo for fechado por meio da rolagem
    const gearIcon = document.querySelector(".style-switcher-toggler .fa-cog");
    gearIcon.classList.remove("stop-rotation");
  }
});

// Obtém todos os estilos alternativos
const alternateStyles = document.querySelectorAll(".alternate-style");

// Define o estilo ativo com base na cor selecionada pelo usuário
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled"); // Habilita o estilo selecionado
    } else {
      style.setAttribute("disabled", "true"); // Desabilita os outros estilos
    }
  });

  // Salva a preferência do usuário no localStorage
  localStorage.setItem("selectedStyle", color);
}

// Obtém o elemento de alternância entre o modo claro e escuro
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
  // Alterna entre os ícones de sol e lua
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");

  // Alterna a classe "white-mode" no corpo do documento para ativar ou desativar o modo claro
  document.body.classList.toggle("white-mode");

  // Salva a preferência do usuário no localStorage
  const isWhiteMode = document.body.classList.contains("white-mode");
  localStorage.setItem("isWhiteMode", isWhiteMode);
});

window.addEventListener("load", () => {
  // Carrega as preferências salvas do usuário ao carregar a página
  const selectedStyle = localStorage.getItem("selectedStyle");
  const isWhiteMode = localStorage.getItem("isWhiteMode");

  if (selectedStyle) {
    setActiveStyle(selectedStyle); // Aplica o estilo salvo
  }

  if (isWhiteMode === "true") {
    dayNight.querySelector("i").classList.add("fa-sun"); // Ativa o ícone do sol
    document.body.classList.add("white-mode"); // Ativa o modo claro
  } else {
    dayNight.querySelector("i").classList.add("fa-moon"); // Ativa o ícone da lua
  }
});
/*=============== =============== ===============*/

/*=============== THE SCRIPT OF DETALHES PAGE ===============*/

/*=============== FILTER-DETALHES ===============*/
const MainImg = document.getElementById("MainImg");
const smallimg = document.getElementsByClassName("small-img");

// Manipulando IMGS
smallimg[0].onclick = function () {
  MainImg.src = smallimg[0].src;
};
smallimg[1].onclick = function () {
  MainImg.src = smallimg[1].src;
};
smallimg[2].onclick = function () {
  MainImg.src = smallimg[2].src;
};
smallimg[3].onclick = function () {
  MainImg.src = smallimg[3].src;
};

const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("tab__active");
    });

    target.classList.add("tab__active");

    tabs.forEach((tab) => {
      tab.classList.remove("tab__active");
    });

    tab.classList.add("tab__active");
  });
});
/*=============== =============== ===============*/

/*=============== THE SCRIPT OF COMMON-QUESTIONS PAGE ===============*/

function toggleAnswer(answerId) {
  var answerElement = document.getElementById(answerId);
  var questionElement = document.getElementById("question-" + answerId);

  if (
    answerElement.style.display === "" ||
    answerElement.style.display === "none"
  ) {
    answerElement.style.display = "block";
    questionElement.classList.add("active");
  } else {
    answerElement.style.display = "none";
    questionElement.classList.remove("active");
  }
}
