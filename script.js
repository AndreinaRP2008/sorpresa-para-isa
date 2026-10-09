const screens = [...document.querySelectorAll(".screen")];
const startButton = document.getElementById("start-button");
const birthdayForm = document.getElementById("birthday-form");
const birthdayInput = document.getElementById("birthday");
const gateMessage = document.getElementById("gate-message");

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

startButton.addEventListener("click", () => showScreen("gate"));

document.querySelectorAll("[data-screen]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

birthdayForm.addEventListener("submit", event => {
  event.preventDefault();
  // Es una pista lúdica, no una contraseña ni una medida de seguridad.
  if (birthdayInput.value === "2023-11-15") {
    gateMessage.textContent = "";
    showScreen("story");
    showChapter(0);
  } else {
    gateMessage.textContent = "Mmm… esa fecha no abre esta puerta. Inténtalo de nuevo, amor. ✨";
  }
});

let currentChapter = 0;
const chapters = [...document.querySelectorAll(".chapter")];
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");

function showChapter(index) {
  currentChapter = Math.max(0, Math.min(index, chapters.length - 1));
  chapters.forEach((chapter, i) => chapter.classList.toggle("active", i === currentChapter));
  previousButton.disabled = currentChapter === 0;
  nextButton.textContent = currentChapter === chapters.length - 1 ? "Volver a empezar ↻" : "Siguiente ✦";
  progressBar.style.width = `${((currentChapter + 1) / chapters.length) * 100}%`;
  progressLabel.textContent = `Capítulo ${currentChapter + 1} de ${chapters.length}`;
}

previousButton.addEventListener("click", () => showChapter(currentChapter - 1));
nextButton.addEventListener("click", () => {
  showChapter(currentChapter === chapters.length - 1 ? 0 : currentChapter + 1);
});

document.getElementById("gift-button").addEventListener("click", () => {
  document.getElementById("gift-reveal").hidden = false;
  document.getElementById("gift-button").hidden = true;
});

document.getElementById("restart-button").addEventListener("click", () => {
  showChapter(0);
  showScreen("welcome");
});