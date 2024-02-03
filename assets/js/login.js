const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");
const loginButton = document.getElementById("loginButton");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.toggle("show-signup");
  });
});

loginButton.addEventListener("click", function (e) {
  e.preventDefault();

  const emailInput = document.querySelector("#emailInput");
  const passwordInput = document.querySelector("#passwordInput");

  if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
    window.location.href = "../index.html";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});
