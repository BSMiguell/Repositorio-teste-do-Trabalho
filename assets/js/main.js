const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
  });
}

let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

if (menu && navbar) {
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };

  window.onscroll = () => {
    menu.classList.remove("bx-x");
    navbar.classList.remove("active");
  };
}

/*=============== THE SCRIPT OF DETALHES PAGE ===============*/

/*=============== FILTER-DETALHES ===============*/
const MainImg = document.getElementById("MainImg");
const smallimg = document.getElementsByClassName("small-img");

// Manipulando IMGS
for (let i = 0; i < smallimg.length; i++) {
  smallimg[i].onclick = function () {
    MainImg.src = smallimg[i].src;
  };
}

const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    if (target) {
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("tab__active");
      });

      target.classList.add("tab__active");

      tabs.forEach((tab) => {
        tab.classList.remove("tab__active");
      });

      tab.classList.add("tab__active");
    }
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
/*=============== =============== ===============*/

/*=============== THE SCRIPT OF PRICING PAGE ===============*/
const popup = document.getElementById("popup");
const closeButton = document.getElementById("closeButton");

// Obtenha todos os botões com a classe "btn bnt__pricing"
const selectButtons = document.querySelectorAll(".btn.bnt__pricing");

function openPopup() {
  if (popup) {
    popup.classList.add("open-popup");
  }
}

function closePopup() {
  if (popup) {
    popup.classList.remove("open-popup");
  }
}

if (closeButton) {
  closeButton.addEventListener("click", closePopup);
}

// Adicione o evento de clique para cada botão
if (selectButtons) {
  selectButtons.forEach((button) => {
    button.addEventListener("click", openPopup);
  });
}
