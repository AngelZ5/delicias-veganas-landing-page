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
