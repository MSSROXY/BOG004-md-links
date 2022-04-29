// const fs = require('fs');
// var clc = require('cli-color');
// var path = require('path');
// const [, ,route, directory] = process.argv;

//para obtener la ruta absoluta 
console.log(process.argv);
const absPath = path.resolve(route)
console.log(absPath);

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

//Empecemos a construir la función mdLinks con pseudocodigo
// el módulo a exportar es mdLinks
// lo podemos exportar :
        // module.exports.mdLinks = (path, options) => {
        //     // ...
        // };
// o así: 
        // module.exports.mdLinks= mdLinks
        // (para esto anteriormente tengo que tener la función mdLinks)
        // const mdLinks = (path, options) => {}
// construyamos primero la función 
// const mdLinks = (path, options) => {}
// puede recibir 2 argumentos. el primero es obligatorio, el otro no 
// el path se convierte en ruta absoluta
// si encuentra un directorio debe hacer uso de recursividad, entrando a c/carpeta sucesivamente
// Busca todos los archivos con extensión md
// imprime todos los links dentro de cada md, con la ruta y el texto dentro de c/link
// SI ADEMÁS ME SOLICITA OPTIONS (--validate)
    // (se hace uso del modulo http para conocer si links funcionan o no)
    // se agrega ok/fail en cada caso y el status de la respuesta (200,301,400,etc)
// SI SOLICITA OPTIONS (--stats) 
    // se da un texto básico sobre los links
    // incluye: Total y Unique
// SI SOLICITA OPTIONS (--stats --validate)
    // output sería: Total, Unique, Broken: 1  

