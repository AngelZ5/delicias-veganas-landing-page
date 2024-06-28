function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + "+" + " Copias Vendidas!"; // Adiciona o "+" após a contagem terminar
    }
  };
  window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  let number = document.querySelector("#number");
  animateCounter(number, 0, 575, 1000); // De 0 a 500 em 5 segundos
});

document.addEventListener("DOMContentLoaded", () => {
  const promoTimerElement = document.getElementById("promo-timer");

  // Duração da promoção em segundos (por exemplo 1 hora = 3600 segundos)
  const promoDuration = 3600;

  // Função para calcular o tempo restante
  function calculateTimeRemaining(endTime) {
    const total = endTime - Date.now();
    const seconds = Math.floor((total / 1000) % 30);
    const minutes = Math.floor((total / 1000 / 15) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  }

  // Função para inicializar o temporizador
  function initializeTimer(endTime) {
    function updateTimer() {
      const t = calculateTimeRemaining(endTime);
      promoTimerElement.innerHTML = `<p class="text-2xl rounded-lg" style="background-color: black; padding: 5px;">Tempo para promoção acabar: <span style="color: red;">${t.hours}h ${t.minutes}m ${t.seconds}s</span></p>`;

      if (t.total <= 0) {
        clearInterval(timeinterval);
        promoTimerElement.innerHTML = "Promoção encerrada";
      }
    }

    updateTimer();
    const timeinterval = setInterval(updateTimer, 1000);
  }

  // Verificar se já existe um tempo final salvo no localStorage
  let endTime = localStorage.getItem("promoEndTime");
  if (!endTime) {
    // Calcular o novo tempo final
    endTime = Date.now() + promoDuration * 1000;
    localStorage.setItem("promoEndTime", endTime);
  }

  initializeTimer(parseInt(endTime, 10));
});
