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

// const links = document.querySelectorAll("a:not([href^='http'])");

// links.forEach((link) => {
//   link.addEventListener("click", function (event) {
//     const currentActive = document.querySelector("a.active");
//     if (currentActive) {
//       currentActive.classList.remove("active");
//     }
//     link.classList.add("active");
//   });
// });

// const linksSmooth = document.querySelectorAll("a[href^='#']");

// linksSmooth.forEach((link) => {
//   link.addEventListener("click", function (event) {
//     event.preventDefault();
//     const targetId = link.getAttribute("href");
//     const targetSection = document.querySelector(targetId);
//     if (targetSection) {
//       targetSection.scrollIntoView({ behavior: "smooth" });
//     }
//   });
// });
