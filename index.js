const [, ,route, ...options] = process.argv;

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

// convierto la ruta en absoluta
let myRoute = routeAbsolute(route);

// obtengo array de mdFiles
const myMDfiles = listMDfiles(myRoute);

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