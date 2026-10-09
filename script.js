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
  if (birthdayInput.value === "2005-10-21") {
    gateMessage.textContent = "";
    showScreen("story");
    showChapter(0);
  } else {
    gateMessage.textContent = "Mmm… esa fecha todavía no abre esta puerta. Inténtalo de nuevo, amor. ✨";
  }
});

let currentChapter = 0;
const chapters = [...document.querySelectorAll(".chapter")];
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");

function showChapter(index, shouldScroll = false) {
  currentChapter = Math.max(0, Math.min(index, chapters.length - 1));
  chapters.forEach((chapter, i) => chapter.classList.toggle("active", i === currentChapter));
  previousButton.disabled = currentChapter === 0;
  nextButton.textContent = currentChapter === chapters.length - 1 ? "Volver a empezar ↻" : "Siguiente ✦";
  progressBar.style.width = `${((currentChapter + 1) / chapters.length) * 100}%`;
  progressLabel.textContent = `Capítulo ${currentChapter + 1} de ${chapters.length}`;
  if (currentChapter === 4) document.getElementById("gift-button").focus({ preventScroll: true });
  if (shouldScroll) {
    chapters[currentChapter].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
previousButton.addEventListener("click", () => showChapter(currentChapter - 1, true));
nextButton.addEventListener("click", () => {
  if (currentChapter === chapters.length - 1) {
    showChapter(0);
    showScreen("welcome");
  } else showChapter(currentChapter + 1, true);
});

document.querySelectorAll(".reason").forEach(button => {
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    button.querySelector("small").textContent = open ? "Descubrir" : "Descubierta";
    const count = document.querySelectorAll(".reason[aria-expanded='true']").length;
    document.getElementById("reason-count").textContent = `Has descubierto ${count} de 21 estrellas.`;
  });
});

const envelopeMessages = {
  "bad-day": "Amor, respira un poquito. No tienes que resolverlo todo hoy ni ser fuerte cada segundo. Un día difícil no define quién eres ni todo lo bonito que todavía te espera. Ojalá pudiera abrazarte ahora, escucharte sin prisas y recordarte que no tienes que poder con todo a la vez. Estoy mandándote muchísimo cariño. 💜",
  "miss-you": "Si has abierto esto porque me extrañas, imagina que te abrazo muy fuerte y me quedo ahí un ratito, sin que tengamos que decir nada. La distancia puede hacer que algunos días pesen más, pero también me recuerda lo mucho que significan para mí nuestros momentos. Cierra los ojos un segundo: te mando un beso enorme. 💌",
  "laugh": "Aviso oficial: este sobre contiene una cantidad científicamente imposible de besos, un abrazo que no cabe en la pantalla y una orden muy seria de que sonrías aunque sea un poquito. Si no funciona, vuelve a abrirlo. Y si el día sigue siendo complicado, recuerda que aquí tienes un rinconcito lleno de cariño para ti. 😂",
  "proud": "Por si hoy se te ha olvidado: no necesitas tenerlo todo claro para estar avanzando. Puedes aprender, equivocarte, descansar y volver a intentarlo. Yo deseo que veas en ti todo lo bueno que hay, incluso cuando te cueste encontrarlo. Estoy celebrando a la persona que eres y a la que sigues construyendo. ⭐"
};
document.querySelectorAll(".envelope").forEach(button => {
  button.addEventListener("click", () => {
    const box = document.getElementById("envelope-message");
    box.textContent = envelopeMessages[button.dataset.message];
    box.hidden = false;
  });
});

document.getElementById("gift-button").addEventListener("click", () => {
  document.getElementById("gift-reveal").hidden = false;
  document.getElementById("gift-button").hidden = true;
});
document.getElementById("restart-button").addEventListener("click", () => {
  showChapter(0);
  showScreen("welcome");
});

// Permite ampliar las fotos del álbum al abrirlas en una pestaña aparte.
document.querySelectorAll(".memory-card img").forEach(img => {
  img.addEventListener("click", () => {
    if (!img.hidden && img.complete && img.naturalWidth > 0) window.open(img.src, "_blank", "noopener");
  });
});
