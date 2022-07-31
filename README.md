# :movie_camera: My Moviz :film_projector:

Ma première SAP (Single Page Application) avec la librairie front-end `React`.
My Moviz est une application web qui propose une liste de films, avec les dernières sorties cinéma à jour, et qui permet de créer une "wishlist" personnalisée.

## FONCTIONNALITES PRINCIPALES

- Un catalogue de films actuellement au cinéma avec un descriptif (photo, titre et description) pour chaque film
- Liker un film
- Ajouter ou supprimer de la wishlist
- Donner une note pour les films regardés

## USAGE

### Back-end

Installer les modules définis dans `package.json` par `node package manager (npm)`

```node
npm install
```

Créer le fichier des variables d'environnement `.env` à la racine du projet et les donner des valeurs pour votre environnement de développement

- `DB_LOGIN`
- `DB_PWD`
- `DB_HOSTNAME`
- `DB_NAME`
- `API_TOKEN`

Démarrer le serveur en local

```node
npm start
```

### Front-end

Déplacer vers le répertoire du front-end React

```bash
 cd ./reactapp
```

Installer les modules définis dans `package.json` par `node package manager (npm)`

```node
npm install
```

Démarrer l'application en local

```node
npm start
```

Naviguer le navigateur vers <http://localhost:3001>. La page web s'actualise automatiquement si l'on change un des fichiers source.

> Le port **3000** est occupé par le serveur en local donc on utilise le port **3001**

## TECHNOLOGIES

- `html`, `css` et `bootstrap` pour créer un UI responsible
- `react` pour créer des composants et gérer des événements de l'application
- `express` pour créer rapidement une infrastructure Web souple sous l'environment `node.js` et pour rendre dynamique les pages HTML
- `MongoDB` pour le stockage des données et la bibliothèque MongooseDB pour créer la connexion entre MongoDB et le serveur node.js
- `API TheMovieDB` <https://www.themoviedb.org/?language=fr>

[![npm](https://img.shields.io/npm/v/npm)](https://npm.im/npm)

## A QUOI CE WEB RESSEMBLE ?

### :computer: "On the internet"

Le projet a été déployé sur `Heroku` et il se retrouve via le lien : <https://mymoviz00.herokuapp.com/>

### :clapper: Youtube

[![Demo projet sur ma chaîne youtube](https://img.youtube.com/vi/_YvwbJi01gI/0.jpg)](https://youtu.be/_YvwbJi01gI)

## LICENCE

![NPM](https://img.shields.io/npm/l/express)
