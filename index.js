const fs = require('fs');
var clc = require('cli-color');
const [, ,route] = process.argv;

console.log(clc.red.bgWhite('esta es la ruta a analizar: ', route))

fs.promises.readFile(route)
  .then((result) => {
    console.log(result.toString())
  })
  .catch((error) => {
    console.log('este es el error: ', error)
  });



// module.exports = () => {
//     // ...
// };
