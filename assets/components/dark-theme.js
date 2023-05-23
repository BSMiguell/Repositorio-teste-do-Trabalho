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
