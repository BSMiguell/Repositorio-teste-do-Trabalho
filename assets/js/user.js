let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");
let isOpen = false;

const toggle = () => {
  profileDropdownList.classList.toggle("active");
  isOpen = !isOpen;
};

btn.addEventListener("click", toggle);

window.addEventListener("scroll", () => {
  if (isOpen) {
    profileDropdownList.classList.remove("active");
    isOpen = false;
  }
});

let editProfileLink = document.getElementById("edit-profile-link");
let editProfileModal = document.getElementById("edit-profile-modal");
let closeModal = document.getElementsByClassName("modal-close")[0];
let saveProfileBtn = document.getElementById("save-profile-btn");
let profileImgInput = document.getElementById("profile-img-input");
let usernameInput = document.getElementById("username-input");
let profileImg = document.querySelector(".profile-img");
let username = document.getElementById("username");

editProfileLink.addEventListener("click", function (event) {
  event.preventDefault();
  editProfileModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  editProfileModal.style.display = "none";
});

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
