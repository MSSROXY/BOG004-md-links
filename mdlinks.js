#!/usr/bin/env node
const {
  clc,
  routeAbsolute,
  listMDfiles,
  getLinksInfo,
} = require('./functions')

const {
  validateOption,
  statOption,
  statValidateOption,
} = require('./cli')

const [, ,route, ...options] = process.argv;

// convierto la ruta en absoluta
let myRoute = routeAbsolute(route);

// obtengo array de mdFiles
const myMDfiles = listMDfiles(myRoute);
console.log(myMDfiles);


// función mdLinks
const mdLinks = (array, options) => {
  if(options == '--validate'){
      return new Promise((resolve, reject) => {
          validateOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ▂ ▃ ▅ ▆ █ Links Validados █ ▆ ▅ ▃ ▂  
          `),
          data)))
          .catch(err => reject(err))
      })
  } else if(options == '--stats'){
      return new Promise((resolve, reject) => {
          statOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ▂ ▃ ▅ ▆ █ Stats de Links █ ▆ ▅ ▃ ▂  
          `))
          ,console.table(data)))
          .catch(err => reject(err))
      })
  } else if(options.includes('--validate' && '--stats')){
      return new Promise((resolve, reject) => {
          statValidateOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ▂ ▃ ▅ ▆ █ Validación y stats de Links █ ▆ ▅ ▃ ▂  
          `))
          ,console.table(data)))
          .catch((err)=> reject(err))
      })
  } else {
      return new Promise((resolve, reject) => {
          getLinksInfo(array)
              .then(data => resolve(console.log(clc.magentaBright(`
              ▂ ▃ ▅ ▆ █ Links encontrados █ ▆ ▅ ▃ ▂  
              `),
              data)))
              .catch(err => reject(err))
      })
  }
}

mdLinks(myMDfiles, options)
.then(data => data)
.catch(error => console.log(error))

module.exports = { mdLinks }