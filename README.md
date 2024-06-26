# Port de Plaisance Russell - API

Ce projet est une application de gestion des catways et des réservations pour le Port de Plaisance Russell. Elle permet d'ajouter, de modifier et de supprimer des catways et des réservations.

## Fonctionnalités

- **Gestion des Catways**
  - Ajouter un catway
  - Modifier un catway
  - Supprimer un catway
  - Lister les catways

- **Gestion des Réservations**
  - Ajouter une réservation
  - Supprimer une réservation
  - Lister les réservations

## Prérequis

- Node.js
- MongoDB

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/devlivepro/api
   cd votre-depot

    Installez les dépendances :

    bash

    npm install

Configurez les variables d'environnement en créant un fichier .env à la racine du projet avec le contenu suivant :

plaintext

    MONGODB_URI=mongodb://localhost:27017/API
    JWT_SECRET=your_jwt_secret_key

Démarrage

    Assurez-vous que MongoDB est en cours d'exécution :

    bash

mongod

Lancez le serveur Node.js :

    npm start

Ouvrez votre navigateur et accédez à :

plaintext

    http://localhost:3000

Structure du Projet

    public/ : Contient les fichiers statiques (HTML, CSS, JavaScript).
    routes/ : Contient les fichiers de routage pour les catways, les utilisateurs et les réservations.
    controllers/ : Contient les fichiers de contrôleurs pour gérer la logique métier des catways et des réservations.
    models/ : Contient les modèles Mongoose pour les catways et les réservations.
    middlewares/ : Contient les middlewares pour l'authentification.

API Endpoints
Catways

    POST /api/catways : Ajouter un nouveau catway
    GET /api/catways : Récupérer tous les catways
    GET /api/catways/:id : Récupérer un catway par ID
    PUT /api/catways/:id : Modifier un catway par ID
    DELETE /api/catways/:id : Supprimer un catway par ID

Réservations

    POST /api/reservations : Ajouter une nouvelle réservation
    GET /api/reservations : Récupérer toutes les réservations
    GET /api/reservations/:id : Récupérer une réservation par ID
    DELETE /api/reservations/:id : Supprimer une réservation par ID

Utilisation
Ajouter un Catway

    Remplissez le formulaire pour ajouter un catway.
    Cliquez sur "Ajouter Catway".

Modifier un Catway

    Remplissez le formulaire pour modifier un catway en utilisant son ID.
    Cliquez sur "Modifier Catway".

Supprimer un Catway

    Remplissez le formulaire pour supprimer un catway en utilisant son ID.
    Cliquez sur "Supprimer Catway".

Ajouter une Réservation

    Remplissez le formulaire pour ajouter une réservation.
    Cliquez sur "Enregistrer Réservation".

Supprimer une Réservation

    Remplissez le formulaire pour supprimer une réservation en utilisant son ID.
    Cliquez sur "Supprimer Réservation".


Création d'un utilisateur avec le programme Postman qui sert d'insertion de requête rapidement :

Choisissez POST, entrer l'adresse ci-dessous :

    http://localhost:3000/api/users/register

Cliquez sur Header, rentrer dans la case "Key" Authorization, pour le token, voici un exemple : 

    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGU0NmRlZWY0YjQ0NWM4ZTdmNjM2NCIsImlhdCI6MTcxNjU1NTQ4MCwiZXhwIjoxNzE2NTU5MDgwfQ.My7nNzekx6Y_NDND4uvAaxZq8TTOfaGw9lEQGfQrmiM

Pour la requête aller dans "Body" et colonne "Raw" :

    {
     "name": "John Doe",
     "email": "johndoe@gmail.fr",
     "password": "john"
    }


Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre un problème ou une demande de tirage pour toute amélioration ou correction de bug.
Licence

Ce projet est sous licence MIT.