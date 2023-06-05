let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");
let isOpen = false;

const toggle = () => {
  profileDropdownList.classList.toggle("active");
  isOpen = !isOpen;
};

const closeDropdown = () => {
  if (isOpen) {
    profileDropdownList.classList.remove("active");
    isOpen = false;
  }
};

btn.addEventListener("click", toggle);

window.addEventListener("click", (event) => {
  // Fechar caso tenha clique foi fora do elemento
  if (
    !profileDropdownList.contains(event.target) &&
    !btn.contains(event.target)
  ) {
    closeDropdown();
  }
});
// Fechar ao rolar a tela
window.addEventListener("scroll", closeDropdown);

let editProfileLink = document.getElementById("edit-profile-link");
let editarColorLink = document.getElementById("editar-color-link");
let editProfileModal = document.getElementById("edit-profile-modal");
let editarColorModal = document.getElementById("editar-color-modal");
let closeModal = document.getElementsByClassName("modal-close");
let saveProfileBtn = document.getElementById("save-profile-btn");
let saveColorBtn = document.getElementById("save-color-btn");
let profileImgInput = document.getElementById("profile-img-input");
let usernameInput = document.getElementById("username-input");
let colorInput = document.getElementById("color-input");
let profileImg = document.querySelector(".profile-img");
let username = document.getElementById("username");

editProfileLink.addEventListener("click", function (event) {
  event.preventDefault();
  editProfileModal.style.display = "block";
});

editarColorLink.addEventListener("click", function (event) {
  event.preventDefault();
  editarColorModal.style.display = "block";
});

for (let i = 0; i < closeModal.length; i++) {
  closeModal[i].addEventListener("click", function () {
    editProfileModal.style.display = "none";
    editarColorModal.style.display = "none";
  });
}

saveProfileBtn.addEventListener("click", function () {
  let imgFile = profileImgInput.files[0];
  let imgReader = new FileReader();

  imgReader.onload = function (e) {
    profileImg.innerHTML = `<img src="${e.target.result}">`;
  };

  imgReader.readAsDataURL(imgFile);

  username.textContent = usernameInput.value;
  editProfileModal.style.display = "none";
});

saveColorBtn.addEventListener("click", function () {
  let selectedColor = colorInput.value;
  document.body.style.backgroundColor = selectedColor;
  editarColorModal.style.display = "none";
});
