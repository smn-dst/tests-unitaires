const pageAccueil = document.getElementById("page-accueil");
const pageListe = document.getElementById("page-liste");
const btnVoirListe = document.getElementById("btn-voir-liste");
const btnRetour = document.getElementById("btn-retour");
const listeItems = document.getElementById("liste-items");

function afficherPage(id) {
  pageAccueil.classList.remove("active");
  pageListe.classList.remove("active");
  document.getElementById(id).classList.add("active");
}

function chargerItems() {
  fetch("/todos")
    .then((res) => res.json())
    .then((data) => {
      listeItems.innerHTML = "";
      (data.items || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name + " — " + item.content;
        listeItems.appendChild(li);
      });
    })
    .catch(() => {
      listeItems.innerHTML = "<li>Erreur chargement</li>";
    });
}

btnVoirListe.addEventListener("click", () => {
  chargerItems();
  afficherPage("page-liste");
});

btnRetour.addEventListener("click", () => {
  afficherPage("page-accueil");
});
