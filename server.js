//importation
const http = require('http'); 
const app = require('./app'); 
const dotenv = require('dotenv');//variable d'environnement

const result = dotenv.config();
if (result.error) {
  throw result.error
} 
console.log(result.parsed);

//normalizePort
//fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//set le port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


//errorHandler
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//l'instance du serveur
const server = http.createServer(app); //retourne une nouvelle instance de http

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);


// //AVANT CODE AMELIORATION SERVEUR
// //importer le package http de node
// const http = require('http');

// //
// const app = require('./app');

// //
// app.set('port', process.env.PORT || 3000);

// //création du serveur
// const server = http.createServer(app);

// //le serveur doit écouter les requêtes envoyer
// server.listen(process.env.PORT || 3000);