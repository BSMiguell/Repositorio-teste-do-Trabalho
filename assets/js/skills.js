document.addEventListener("DOMContentLoaded", function () {
  const btnSkills = document.querySelectorAll(".btn-skills");
  btnSkills.forEach(function (btn) {
    btn.addEventListener("click", function () {
      toggleDivs(btn);
    });
  });

  // Função para adicionar os eventos aos botões
  function toggleDivs(btnSkills) {
    const parentElement = btnSkills.parentElement;
    const devDiv = parentElement.querySelector(".dev");
    const skillsDiv = parentElement.querySelector(".skills");

    if (devDiv.classList.contains("active")) {
      devDiv.classList.remove("active");
      skillsDiv.classList.add("active");
      btnSkills.textContent = "Dev";
      animateSkills(skillsDiv);
      parentElement.classList.add("skils-color");
    } else {
      devDiv.classList.add("active");
      skillsDiv.classList.remove("active");
      btnSkills.textContent = "Skills";
      resetSkills(skillsDiv);
      parentElement.classList.remove("skils-color");
    }
  }

  const btnSkillsList = document.querySelectorAll(".btn-skills");
  btnSkillsList.forEach(function (btn) {
    btn.addEventListener("click", toggleDivs);
  });
});

// Função para animar as barras de skills com base nas porcentagens
function animateSkills(skillsDiv) {
  const skills = skillsDiv.querySelectorAll(".skill");
  skills.forEach(function (skill) {
    const fill = skill.querySelector(".fill");
    const percentage = skill.querySelector(".percentage");
    const width = parseInt(percentage.innerHTML);
    let currentWidth = 0;
    const interval = setInterval(frame, 10);

    function frame() {
      if (currentWidth >= width) {
        clearInterval(interval);
      } else {
        currentWidth++;
        fill.style.width = `${currentWidth}%`;
      }
    }
  });
}

// Função para redefinir as barras de skills para zero
function resetSkills(skillsDiv) {
  const fills = skillsDiv.querySelectorAll(".fill");
  fills.forEach(function (fill) {
    fill.style.width = "0%";
  });
}

function updateTechnologyBoxesColor(isSkillsActive) {
  const technologyBoxes = document.querySelectorAll(".technology__box");
  technologyBoxes.forEach(function (box) {
    if (isSkillsActive && box.classList.contains("skils-color")) {
      box.querySelector(".technology-boxs").classList.add("skils-color");
    } else {
      box.querySelector(".technology-boxs").classList.remove("skils-color");
    }
  });
}

// Remover a classe "active" da div "skills" ao carregar a página
window.addEventListener("load", function () {
  const skillsDivs = document.querySelectorAll(".skills");
  skillsDivs.forEach(function (skillsDiv) {
    skillsDiv.classList.remove("active");
  });
  updateTechnologyBoxesColor(false); // Inicialmente define a cor das caixas de tecnologia para a cor padrão
});
