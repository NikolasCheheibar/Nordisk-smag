/** @format */

// recipes.js - fetch list fra DummyJSON
document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".recipe-list");
  const select = document.getElementById("filter");
  const params = new URLSearchParams(window.location.search);
  const qType = params.get("type") || "";

  fetch("https://dummyjson.com/recipes")
    .then((r) => r.json())
    .then((data) => {
      let recipes = data.recipes || [];
      if (qType) recipes = recipes.filter((r) => r.mealType && r.mealType.includes(qType));
      showList(recipes);
    })
    .catch((err) => {
      console.error(err);
      if (list) list.innerHTML = "<p>Kunne ikke hente opskrifter.</p>";
    });

  if (select) {
    select.value = qType;
    select.addEventListener("change", (e) => {
      const v = e.target.value;
      if (v) window.location = "recipes.html?type=" + encodeURIComponent(v);
      else window.location = "recipes.html";
    });
  }
});

function showList(recipes) {
  const container = document.querySelector(".recipe-list");
  if (!container) return;
  container.innerHTML = "";
  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p>Ingen opskrifter fundet.</p>";
    return;
  }
  recipes.forEach((r) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.innerHTML = `
      <img loading="lazy" src="${r.image}" alt="${r.name}">
      <h3>${r.name}</h3>
      <p>${r.cuisine || ""}</p>
      <a href="recipe.html?id=${r.id}">Se detaljer</a>
    `;
    container.appendChild(card);
  });
}
