/** @format */

// main.js - utility listeners
document.addEventListener("DOMContentLoaded", () => {
  // Lige nu gør denne del faktisk ikke noget endnu.
  // Jeg har bare lagt den her som en slags “plads-holder”,
  // så jeg nemt kan smide mere kode ind senere, hvis jeg får brug for det.
});

// Slider scroll functionality
document.addEventListener("DOMContentLoaded", () => {
  // Jeg venter, til siden er helt klar, før jeg begynder at køre noget af dette.

  const sliders = document.querySelectorAll(".recipe-slider");
  // Her finder jeg alle mine sliders på siden – altså de der små bokse,
  // hvor man kan scrolle gennem opskrifterne.

  sliders.forEach((slider) => {
    // Jeg kører igennem hver slider én for én og giver dem noget funktionalitet.

    const list = slider.querySelector(".recipe-list");
    // Det her er selve listen inde i slideren – den del, der bevæger sig.

    const leftBtn = slider.querySelector(".scroll-btn.left");
    const rightBtn = slider.querySelector(".scroll-btn.right");
    // Og her finder jeg de to pile-knapper, som jeg skal bruge til at scrolle med.

    const scrollAmount = 300; // Jeg har valgt at den skal rykke 300 pixels ad gangen, det passer ret godt.

    // Når jeg klikker på pilen til højre, scroller slideren mod højre
    rightBtn.addEventListener("click", () => {
      list.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // Jeg har sat “smooth” på, så bevægelsen ser lækker og flydende ud.
    });

    // Og når jeg klikker på pilen til venstre, scroller den den anden vej
    leftBtn.addEventListener("click", () => {
      list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  });
});
