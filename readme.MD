# Installation et mise en service du frontend et du backend

## FrontEnd
-téléchargement du frontend ici : https://github.com/OpenClassrooms-Student-Center/dwj-projet6   
ou  
`$ git clone https://github.com/OpenClassrooms-Student-Center/dwj-projet6.git frontend ` 

`$ cd frontend`

après :
avec le terminal dans le **dossier racine du frontend**

`$ npm install`

`$ npm install node-sass@4.14.1`

`$ npm run start`

Dans le navigateur mettre l'adresse : http://localhost:4200/

## Backend
-téléchargement du backend ici : https://github.com/jpmazel/oc-dw-projet6-piquante
ou   
`$ git clone https://github.com/jpmazel/oc-dw-projet6-piquante.git backend `

`$ cd backend`

après, avec le terminal dans le dossier racine du backend  

`$ npm install `

après, création du fichier `.env` à la racine du répertoire et y mettre les valeurs correctes pour se connecter à une base de donnée mongodb : 

`DB_USERNAME="username de la base de donnée mongodb"`  
`DB_PASSWORD="password de la base de donnée mongodb"`  
`DB_NAME="nom de la base de donnée mongodb"`

et après   
`$ npm run start `

**Note** :  des images de sauce piquante sont dans le dossier `images` pour faire des tests

## les dépendances du backend
- **bcrypt** : hash le password avant de le stocker dans la base de donné
- **body-parser** : pour parser la requêtre qui vient du navigateur
- **crypto-js** : pour chiffrer et déchiffrer l'email dans la base de donnée
- **dotenv** : pour l'utilisation des variables d'environnement
- **express** : framework node.js pour faire la web api
- **express-mongo-sanitize**: protection contre les injection sql
- **fs** : pour accéder au dossier
- **jsonwebtoken**: authentification par token
- **mongoose**: pour la base de donnée mongodb
- **mongoose-unique-validator**: pour le controle du mail unique dans la base de donnée
- **morgan** : logger requête et response du sever
- **multer** : pour l'upload de fichier
- **nodemon** : pour relancer le serveur à chaque modification dans le code source
- **normalize** : 
- **normalize-port** : 
- **password-validator**: pour valider un mot de passe fort 


