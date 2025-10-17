/** @format */

// main.js - utility listeners
document.addEventListener("DOMContentLoaded", () => {
  // nothing yet - placeholder for future code
});
// Slider scroll functionality
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".recipe-slider");

  sliders.forEach((slider) => {
    const list = slider.querySelector(".recipe-list");
    const leftBtn = slider.querySelector(".scroll-btn.left");
    const rightBtn = slider.querySelector(".scroll-btn.right");

    const scrollAmount = 300; // pixels to scroll per click

    rightBtn.addEventListener("click", () => {
      list.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftBtn.addEventListener("click", () => {
      list.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  });
});
