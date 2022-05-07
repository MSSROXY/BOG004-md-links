// const fs = require('fs');
// var clc = require('cli-color');
// var path = require('path');
// const [, ,route, directory] = process.argv;

//para obtener la ruta absoluta 
// console.log(process.argv);
// const absPath = path.resolve(route)
// console.log(absPath);

// console.log(clc.red.bgWhite('Esta es la ruta a analizar:', route));
// console.log(clc.blue.bgWhite('Y este es el directorio a enlistar:', directory))
// var files = fs.readdirSync(directory);

// fs.promises.readFile(route)
//   .then((result) => {
//     console.log(clc.red.bgWhite('esta es la extensión del archivo:', path.extname(route)))
//     console.log(result.toString());
//     console.log(clc.blue.bgWhite('esto es el contenido del directorio:', files))
//   })
//   .catch((error) => {
//     console.log('este es el error: ', error)
//   });

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

  //   const getLinks = (object) => {
  //         console.log('********* el file content de mis items: *******', object.fileContent);
  //         console.log('********* la ruta de mis items: *******', object.route)
  // }
  
  // let ejemplo = {
  //     fileContent: 'este es el archivo 2\n' +
  //       'aqui pondre los links a analizar \n' +
  //       '[Youtube](https://www.youtube.com/watch?v=_Kqtj14rxes)\n' +
  //       '[Facebook](https://www.facebook.com/roxysolano)     ',
  //     route: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md'
  //   }
  //   // {
  //   //   fileContent: 'este es el archivo 3\n' +
  //   //     'enlistaré algunos links para probar\n' +
  //   //     '[Promesas](https://anexsoft.com/ejemplo-practico-de-promise-con-javascript)\n' +
  //   //     '[Read-me en español](https://gist.github.com/Villanuevand/6386899f70346d4580c723232524d35a)',
  //   //   route: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md'
  //   // },
  
  // console.log(getLinks(ejemplo))

  // empezamos con el http

const axios = require('axios').default;
const validateHttp = (url) => {
  return new Promise((resolve, reject) => {
      axios.get(url)
      .then(res => resolve({
        status : res.status,
        statusText : res.statusText
      }))
      .catch(err => reject(err))
  })
}

validateHttp('https://axios-http.com/es/docs/handling_errors')
.then(result => console.log(result))
.catch(error => console.log(error))

let prueba = [
  {
    href: 'https://github.com/pandao/editor.md',
    text: '1 link ok',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
  },
  {
    href: 'https://pandao.github.io/editor.md/en.html',
    text: '2 link ok',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
  },
  {
    href: 'http://errorexample.com/',
    text: '3 link broken',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
  },
  {
    href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
    text: 'Youtube',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md'
  },
  {
    href: 'https://www.facebook.com/roxysolano',
    text: 'Facebook',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md'
  },
  {
    href: 'https://anexsoft.com/ejemplo-practico-de-promise-con-javascript',
    text: 'Promesas',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md'
  },
  {
    href: 'https://gist.github.com/Villanuevand/6386899f70346d4580c723232524d35a',
    text: 'Read-me en español',
    file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md'
  }
]

let arrayFilter = (array) => {
  let result = []
  array.forEach(item => {
    result.push(item.href)
  });
  return result
}

console.log(arrayFilter(prueba));