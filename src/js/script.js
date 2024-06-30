function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + "+" + " Copias Vendidas"; // Adiciona o "+" e "Copias Vendidas" após a contagem terminar
    }
  };
  window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  let number = document.querySelector("#number");
  animateCounter(number, 0, 1300, 3000); // De 0 a 1300 em 5 segundos
});

document.addEventListener("DOMContentLoaded", () => {
  const timerElement = document.getElementById("timer");
  const messageElement = document.getElementById("message");
  const promotionDuration = 30 * 60 * 1000; // 30 minutes in milliseconds

  function startTimer() {
    const now = new Date().getTime();
    const endTime = now + promotionDuration;
    localStorage.setItem("promotionEndTime", endTime);
    updateTimer(endTime);
  }

  function updateTimer(endTime) {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        timerElement.innerText = "";
        messageElement.innerText = "Promoção Encerrada";
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerElement.innerText = `${minutes}m ${seconds}s`;
    }, 1000);
  }

  const promotionEndTime = localStorage.getItem("promotionEndTime");

  if (!promotionEndTime) {
    startTimer();
  } else {
    const endTime = parseInt(promotionEndTime, 10);
    const now = new Date().getTime();
    if (now >= endTime) {
      messageElement.innerText = "Promoção Encerrada";
    } else {
      updateTimer(endTime);
    }
  }
});
