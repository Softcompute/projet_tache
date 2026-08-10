const CLE_TACHES = "taskflow-taches";

// Si une sauvegarde existe, elle est chargée. Sinon, on démarre avec une liste vide.
let taches = chargerTaches();

const formulaire = document.querySelector("#formulaire-tache");
const champTache = document.querySelector("#champ-tache");
const listeTaches = document.querySelector("#liste-taches");
const message = document.querySelector("#message");
const compteurTaches = document.querySelector("#compteur-taches");
const pourcentageProgression = document.querySelector("#pourcentage-progression");
const barreProgression = document.querySelector("#barre-progression");
const carteProgression = document.querySelector(".custom-progress");
const messageProgression = document.querySelector("#message-progression");
const objectifProgression = document.querySelector("#objectif-progression");

// Récupère les tâches sauvegardées dans le navigateur.
function chargerTaches() {
  const sauvegarde = localStorage.getItem(CLE_TACHES);

  // Bonne condition : s'il n'y a aucune sauvegarde, on renvoie un tableau vide.
  if (sauvegarde === null) {
    return [];
  }

  try {
    const tachesSauvegardees = JSON.parse(sauvegarde);

    // On vérifie que la donnée sauvegardée est bien un tableau.
    if (Array.isArray(tachesSauvegardees)) {
      return tachesSauvegardees;
    } else {
      return [];
    }
  } catch (erreur) {
    // Si la sauvegarde est invalide, l'application repart proprement.
    return [];
  }
}

// Enregistre la version actuelle du tableau dans le navigateur.
function sauvegarderTaches() {
  localStorage.setItem(CLE_TACHES, JSON.stringify(taches));
}

function ajouterTache(titre) {
  const titreNettoye = titre.trim();

  // Condition de validation : un titre vide n'est pas accepté.
  if (titreNettoye === "") {
    message.textContent = "Écris un titre avant d'ajouter la tâche.";
    return;
  }

  taches.push({
    titre: titreNettoye,
    terminee: false
  });

  sauvegarderTaches();
  message.textContent = "Tâche ajoutée et sauvegardée automatiquement.";
  champTache.value = "";
  afficherTaches();
}

function marquerCommeTerminee(index) {
  // On vérifie que l'index correspond bien à une tâche existante.
  if (taches[index] !== undefined) {
    taches[index].terminee = !taches[index].terminee;
    sauvegarderTaches();
    afficherTaches();
  }
}

function supprimerTache(index) {
  if (taches[index] !== undefined) {
    taches.splice(index, 1);
    sauvegarderTaches();
    message.textContent = "Tâche supprimée automatiquement.";
    afficherTaches();
  }
}

// Calcule et affiche la progression à partir des tâches terminées.
function mettreAJourProgression() {
  const totalTaches = taches.length;
  const nombreTerminees = taches.filter(function (tache) {
    return tache.terminee === true;
  }).length;

  // Condition : avec zéro tâche, la progression reste à 0 %.
  let progression = 0;
  if (totalTaches > 0) {
    progression = Math.round((nombreTerminees / totalTaches) * 100);
  }

  pourcentageProgression.textContent = `${progression}%`;
  barreProgression.style.width = `${progression}%`;
  carteProgression.setAttribute("aria-valuenow", progression);

  if (totalTaches === 0) {
    messageProgression.textContent = "Aucune tâche terminée";
    objectifProgression.textContent = "Commencez maintenant";
  } else if (progression === 100) {
    messageProgression.textContent = "Toutes les tâches sont terminées";
    objectifProgression.textContent = "Objectif atteint";
  } else {
    messageProgression.textContent = `${nombreTerminees} tâche(s) terminée(s)`;
    objectifProgression.textContent = "Continuez ainsi";
  }
}

function afficherTaches() {
  listeTaches.innerHTML = "";
  compteurTaches.textContent = taches.length;
  mettreAJourProgression();

  if (taches.length === 0) {
    listeTaches.innerHTML = "<li class=\"empty-state\">Aucune tâche. Ajoutez votre première action.</li>";
    return;
  }

  for (let index = 0; index < taches.length; index++) {
    const tache = taches[index];
    const element = document.createElement("li");
    element.classList.add("tache");

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

formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
  ajouterTache(champTache.value);
});

afficherTaches();
