/** @format */

// detail.js - fetch single
document.addEventListener("DOMContentLoaded", () => {
  // Jeg starter med at vente på, at hele siden er indlæst, før jeg kører noget JavaScript

  const params = new URLSearchParams(window.location.search);
  // Her laver jeg et objekt, der kan læse parametrene i URL’en – fx ?id=3

  const id = params.get("id");
  // Jeg henter selve ID’et fra URL’en (det fortæller mig, hvilken opskrift jeg skal vise)

  const container = document.getElementById("recipe-container");
  // Jeg finder det HTML-element, hvor opskriften skal vises (det skal have id="recipe-container")

  if (!id || !container) return;
  // Hvis der ikke er noget ID i URL’en, eller jeg ikke kan finde containeren, så stopper jeg bare koden her

  // Nu henter jeg selve opskriften fra dummyjson.com baseret på det ID, jeg fandt før
  fetch("https://dummyjson.com/recipes/" + id)
    .then((r) => r.json()) // Jeg laver svaret om til JSON, så jeg kan arbejde med dataene
    .then((data) => {
      renderDetail(container, data); // Når dataene er klar, sender jeg dem videre til min render-funktion
    })
    .catch((err) => {
      console.error(err); // Hvis noget går galt, skriver jeg fejlen i konsollen
      container.innerHTML = "<p>Kunne ikke hente opskrift.</p>"; // Og viser en fejlbesked til brugeren
    });
});

function renderDetail(container, r) {
  // Denne funktion står for at vise selve opskriften i HTML’en

  container.innerHTML = `
    <article>
      <h2>${r.name}</h2> <!-- Jeg viser navnet på opskriften -->
      <img loading="lazy" src="${r.image}" alt="${r.name}"> <!-- Og billedet af retten -->
      <p><strong>Kategori:</strong> ${r.cuisine || ""}</p> <!-- Viser hvilken type køkken den hører til -->
      <h3>Ingredienser</h3>
      <ul>${(r.ingredients || []).map((i) => `<li>${i}</li>`).join("")}</ul> <!-- Laver en liste med ingredienser -->
      <h3>Instruktioner</h3>
      <p>${r.instructions || ""}</p> <!-- Og til sidst viser jeg hvordan man laver retten -->
    </article>
  `;
  // Alt sammen bliver sat ind i min "container", så brugeren kan se det på siden
}
