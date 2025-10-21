/** @format */

// recipes.js - henter og viser en liste af opskrifter fra DummyJSON
document.addEventListener("DOMContentLoaded", () => {
  // Jeg venter til siden er helt indlæst, før jeg går i gang

  const list = document.querySelector(".recipe-list");
  // Finder det sted på siden, hvor opskrifterne skal vises

  const select = document.getElementById("filter");
  // Her finder jeg dropdown-menuen, hvor man kan vælge fx “morgenmad”, “frokost” osv.

  const params = new URLSearchParams(window.location.search);
  const qType = params.get("type") || "";
  // Jeg tjekker om der står noget i URL’en som fx ?type=Breakfast,
  // så jeg kan filtrere opskrifterne ud fra det

  // Nu henter jeg alle opskrifterne fra dummyjson.com
  fetch("https://dummyjson.com/recipes")
    .then((r) => r.json()) // Jeg laver svaret om til JSON, så jeg kan arbejde med dataene
    .then((data) => {
      let recipes = data.recipes || []; // Her tager jeg selve listen med opskrifter

      // Hvis der er valgt en bestemt type i URL’en, filtrerer jeg listen så kun de passer vises
      if (qType) recipes = recipes.filter((r) => r.mealType && r.mealType.includes(qType));

      showList(recipes); // Til sidst viser jeg opskrifterne på siden
    })
    .catch((err) => {
      console.error(err); // Hvis der sker en fejl, viser jeg det i konsollen
      if (list) list.innerHTML = "<p>Kunne ikke hente opskrifter.</p>";
      // Og fortæller brugeren, at noget gik galt
    });

  // Her håndterer jeg dropdown-menuen, så man kan vælge fx “middag” og filtrere
  if (select) {
    select.value = qType; // Jeg sætter dropdown-menuen til at vise den nuværende valgte type

    select.addEventListener("change", (e) => {
      const v = e.target.value;
      // Hvis man vælger en type, ændrer jeg URL’en, så siden opdateres med det nye filter
      if (v) window.location = "recipes.html?type=" + encodeURIComponent(v);
      else window.location = "recipes.html"; // Hvis man vælger “alle”, fjerner jeg filteret
    });
  }
});

function showList(recipes) {
  // Denne funktion viser selve listen af opskrifter på siden

  const container = document.querySelector(".recipe-list");
  if (!container) return; // Hvis jeg ikke kan finde containeren, stopper jeg bare her

  container.innerHTML = ""; // Først tømmer jeg containeren, så jeg starter fra nul

  if (!recipes || recipes.length === 0) {
    // Hvis der ikke er nogen opskrifter at vise
    container.innerHTML = "<p>Ingen opskrifter fundet.</p>";
    return;
  }

  // Nu går jeg igennem hver opskrift og laver et kort til den
  recipes.forEach((r) => {
    const card = document.createElement("article");
    card.className = "recipe-card"; // Giver hvert kort en klasse, så jeg kan style det i CSS

    // Her bygger jeg HTML’en til opskriftskortet
    card.innerHTML = `
      <img loading="lazy" src="${r.image}" alt="${r.name}">
      <h3>${r.name}</h3>
      <p>${r.cuisine || ""}</p>
      <a href="recipe.html?id=${r.id}">Se detaljer</a>
    `;
    // Til sidst sætter jeg kortet ind i containeren
    container.appendChild(card);
  });
}
