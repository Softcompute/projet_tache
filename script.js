// Tableau contenant les tâches. Chaque tâche est un objet.
let taches = [
  { titre: "Comprendre les variables JavaScript", terminee: true },
  { titre: "Créer une application de tâches", terminee: false },
  { titre: "Créer une application de web", terminee: false }
];

// Sélection des éléments HTML avec querySelector.
const formulaire = document.querySelector("#formulaire-tache");
const champTache = document.querySelector("#champ-tache");
const listeTaches = document.querySelector("#liste-taches");
const message = document.querySelector("#message");
const compteurTaches = document.querySelector("#compteur-taches");

// Ajoute une tâche dans le tableau.
function ajouterTache(titre) {
  const titreNettoye = titre.trim();

  if (titreNettoye === "") {
    message.textContent = "Écris un titre avant d'ajouter la tâche.";
    return;
  }

  taches.push({
    titre: titreNettoye,
    terminee: false
  });

  message.textContent = "Tâche ajoutée.";
  champTache.value = "";
  afficherTaches();
}

// Marque une tâche comme terminée ou non terminée.
function marquerCommeTerminee(index) {
  if (taches[index]) {
    taches[index].terminee = !taches[index].terminee;
    afficherTaches();
  }
}

// Supprime une tâche du tableau.
function supprimerTache(index) {
  taches.splice(index, 1);
  message.textContent = "Tâche supprimée.";
  afficherTaches();
}

// Rafraîchit la liste affichée à partir du tableau JavaScript.
function afficherTaches() {
  listeTaches.innerHTML = "";
  compteurTaches.textContent = taches.length;

  if (taches.length === 0) {
    listeTaches.innerHTML = "<li>Aucune tâche pour le moment.</li>";
    return;
  }

  // Boucle for pour parcourir toutes les tâches.
  for (let index = 0; index < taches.length; index++) {
    const tache = taches[index];
    const element = document.createElement("li");
    element.classList.add("tache");

    // Condition if/else pour identifier l'état de la tâche.
    if (tache.terminee === true) {
      element.classList.add("terminee");
    } else {
      element.classList.remove("terminee");
    }

    const caseTerminee = document.createElement("input");
    caseTerminee.type = "checkbox";
    caseTerminee.checked = tache.terminee;
    caseTerminee.setAttribute("aria-label", `Terminer : ${tache.titre}`);
    caseTerminee.addEventListener("click", function () {
      marquerCommeTerminee(index);
    });

    const titre = document.createElement("span");
    titre.classList.add("titre");
    titre.textContent = tache.titre;

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.classList.add("bouton-supprimer");
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.addEventListener("click", function () {
      supprimerTache(index);
    });

    element.append(caseTerminee, titre, boutonSupprimer);
    listeTaches.appendChild(element);
  }
}

// Événement clic indirect du formulaire pour ajouter une tâche.
formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
  ajouterTache(champTache.value);
});

// Affichage initial de la liste.
afficherTaches();
