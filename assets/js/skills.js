// Função para alternar entre dev e skills
function toggleDivs() {
  const parentElement = this.parentElement;
  const devDiv = parentElement.querySelector(".dev");
  const skillsDiv = parentElement.querySelector(".skills");
  const btnSkills = this;

  const isDevActive = devDiv.classList.contains("active");
  const isSkillsActive = skillsDiv.classList.contains("active");

  if (isDevActive && !isSkillsActive) {
    devDiv.classList.remove("active");
    skillsDiv.classList.add("active");
    btnSkills.textContent = "Dev";
    animateSkills(skillsDiv);
  } else {
    devDiv.classList.add("active");
    skillsDiv.classList.remove("active");
    btnSkills.textContent = "Skills";
    resetSkills(skillsDiv);
  }
}

// Função para adicionar os eventos aos botões
const btnSkillsList = document.querySelectorAll(".btn-skills");
btnSkillsList.forEach(function (btn) {
  btn.addEventListener("click", toggleDivs);
});

// Função para animar as barras
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

// Função para redefinir as barras de habilidades para zero
function resetSkills(skillsDiv) {
  const fills = skillsDiv.querySelectorAll(".fill");
  fills.forEach(function (fill) {
    fill.style.width = "0%";
  });
}

// Remover a classe "active" da div "skills" ao carregar a página
window.addEventListener("load", function () {
  const skillsDivs = document.querySelectorAll(".skills");
  skillsDivs.forEach(function (skillsDiv) {
    skillsDiv.classList.remove("active");
  });
});
