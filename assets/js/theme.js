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
