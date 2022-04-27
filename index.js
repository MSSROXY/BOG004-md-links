const fs = require('fs');
var clc = require('cli-color');
var path = require('path');
const [, ,route, directory] = process.argv;

console.log(clc.red.bgWhite('Esta es la ruta a analizar:', route));
console.log(clc.blue.bgWhite('Y este es el directorio a enlistar:', directory))
var files = fs.readdirSync(directory);

fs.promises.readFile(route)
  .then((result) => {
    console.log(clc.red.bgWhite('esta es la extensión del archivo:', path.extname(route)))
    console.log(result.toString());
    console.log(clc.blue.bgWhite('esto es el contenido del directorio:', files))
  })
  .catch((error) => {
    console.log('este es el error: ', error)
  });



// module.exports = () => {
//     // ...
// };
