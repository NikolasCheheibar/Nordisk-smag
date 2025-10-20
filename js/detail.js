/** @format */

// detail.js - fetch single
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // her er id fx 15
  const container = document.querySelector(".recipe-detail");
  if (!id || !container) return;

  fetch("https://dummyjson.com/recipes/" + id)
    .then((r) => r.json())
    .then((data) => {
      renderDetail(container, data);
    })
    .catch((err) => {
      console.error(err);
      container.innerHTML = "<p>Kunne ikke hente opskrift.</p>";
    });
});

function renderDetail(container, r) {
  container.innerHTML = `
    <article>
      <h2>${r.name}</h2>
      <img loading="lazy" src="${r.image}" alt="${r.name}">
      <p><strong>Kategori:</strong> ${r.cuisine || ""}</p>
      <h3>Ingredienser</h3>
      <ul>${(r.ingredients || []).map((i) => `<li>${i}</li>`).join("")}</ul>
      <h3>Instruktioner</h3>
      <p>${r.instructions || ""}</p>
    </article>
  `;
}
