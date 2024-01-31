# TODO APP

Todo app réalisé dans le contexte de l'apprentissage de React à l'ESEO Angers. L'application est hébergée sur [Vercel](https://react-todo-app-two-mu.vercel.app/).

## Installation

Pour installer localement l'application, télécharger le projet et ouvrir un terminal dans le dossier du projet. Puis, exécuter la commande suivante:

```bash
npm install
```

Ensuite, pour lancer l'application, exécuter la commande suivante:

```bash
npm run dev
```

## Auteurs

- [**Basile Lebaudy**](mailto:basile.lebaudy@reseau.eseo.fr)
- [**Maxence Le Du**](mailto:maxence.ledu@reseau.eseo.fr)
- [**Louis Legendre**](mailto:louis.legendre@reseau.eseo.fr)

## Fonctionalités

- Catégories :
   - Créer une catégorie
   - Supprimer une catégorie
   - Modifier une catégorie

Les catégories possèdent un nom et une couleur.
- Tâches :
   - Créer une tâche
   - Supprimer une tâche
   - Modifier une tâche
   - Voir les tâches sur un panel à gauche sur la page de l'app

Les tâches ont un nom, une catégorie, une date et une heure, une priorité, ainsi qu'une description optionnelle
- Evénements :
   - Créer un événement
   - Supprimer un événement
   - Modifier un événement
   - Afficher les événements sur un calendrier à droite de la page de l'app

Les évènements ont un nom, un intervalle de temps, un rappel, une catégorie, une priorité, ainsi qu'une description optionnelle
- Notifications :
  - Supprimer une notification
  - Voir les notifications dans le header

Les notifications sont liés aux tâches et évènements et sont affichés en fonction de la date et du rappel renseignés
