# Liste de tâches JavaScript

Ce projet est une application simple de liste de tâches réalisée en HTML, CSS et JavaScript natif. Elle permet d’ajouter une tâche, de la marquer comme terminée et de la supprimer.

## Fonctionnalités

L’application utilise un tableau JavaScript composé d’objets. Chaque objet possède un `titre` de type String et une propriété `terminee` de type Boolean. Les indices du tableau sont gérés avec des valeurs de type Number.

Le contenu de la liste est entièrement généré et rafraîchi depuis JavaScript. Les fonctions principales sont `ajouterTache`, `marquerCommeTerminee`, `supprimerTache` et `afficherTaches`.

## Installation et utilisation

Télécharge ou clone le projet, puis ouvre le fichier `index.html` dans un navigateur web. Aucun serveur ni aucune dépendance externe ne sont nécessaires.

```bash
git clone https://github.com/Softcompute/projet_tache.git
cd liste-taches-javascript
```

## Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page et formulaire d’ajout |
| `style.css` | Mise en forme de l’application |
| `script.js` | Données, fonctions, DOM et événements |
| `README.md` | Documentation du projet |

## Publier le projet sur GitHub

Crée un nouveau dépôt public nommé `liste-taches-javascript` sur GitHub, 
sans générer automatiquement de README. 
Dans le dossier du projet, exécute ensuite les commandes suivantes en remplaçant l’URL par celle de ton dépôt :

```bash
git init
git add index.html style.css
 git commit -m "Créer la structure HTML et les styles"
git add script.js
 git commit -m "Ajouter la logique JavaScript des tâches"
git add README.md
 git commit -m "Documenter le projet"
git branch -M main
git remote add origin https://github.com/Softcompute/projet_tache.git
git push -u origin main
```

Les trois commits proposés sont distincts et possèdent des messages explicites. Pour inviter le formateur, ouvre 
le dépôt GitHub, 
sélectionne **Settings**, 
puis **Collaborators**,
choisis **Add people** et saisis son nom d’utilisateur ou son adresse e-mail GitHub. 
Vérifie ensuite qu’il apparaît bien dans la liste des collaborateurs.
