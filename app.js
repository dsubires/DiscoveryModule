var discovery = require("./discovery.js");
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var output;
var textToSearch = "bajar potencia nevera";

// Inicio del servidor.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/html');67667
  res.end(output);

});

// Configuración del servidor.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Lanzar parámetro al módulo de búsqueda. Entrada/Salida.
discovery.search(textToSearch, function (json) {
  output = json;
});

