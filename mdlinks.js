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

const [, ,route, ...optionsUser] = process.argv;

const validate = optionsUser.includes('--v') || optionsUser.includes('--validate') ? true : false;

const stats = optionsUser.includes('--s') || optionsUser.includes('--stats') ? true : false;

// convierto la ruta en absoluta
let myRoute = routeAbsolute(route);

//funcion 2 mdlinks 
const mdLinks = (path, options) => {
    // obtengo myMDfiles de mdFiles
    const myMDfiles = listMDfiles(path);
    return new Promise ((resolve, reject) => {
        if(!options.validate && !options.stats){
            getLinksInfo(myMDfiles)
            .then(data => resolve(data))
            .catch(err => reject(err))
        }else if((options.validate && options.stats)){
            statValidateOption(myMDfiles)
            .then(data => resolve(data))
            .catch(err => reject(err))
        }else if(options.validate){
            validateOption(myMDfiles)
            .then(data => resolve(data))
            .catch(err => reject(err))
        }else if(options.stats){
            statOption(myMDfiles)
            .then(data => resolve(data))
            .catch(err => reject(err))
        }
    })
}

mdLinks(myRoute, { validate, stats })
.then(data => console.log(data))
.catch(err => console.log(err))


// función mdLinks
// const mdLinks = (myMDfiles, options) => {
//   if(options == '--validate'){
//       return new Promise((resolve, reject) => {
//           validateOption(myMDfiles)
//           .then(data => resolve(console.log(clc.magentaBright(`
//           ▂ ▃ ▅ ▆ █ Links Validados █ ▆ ▅ ▃ ▂  
//           `),
//           data)))
//           .catch(err => reject(err))
//       })
//   } else if(options == '--stats'){
//       return new Promise((resolve, reject) => {
//           statOption(myMDfiles)
//           .then(data => resolve(console.log(clc.magentaBright(`
//           ▂ ▃ ▅ ▆ █ Stats de Links █ ▆ ▅ ▃ ▂  
//           `))
//           ,console.table(data)))
//           .catch(err => reject(err))
//       })
//   } else if(options.includes('--validate' && '--stats')){
//       return new Promise((resolve, reject) => {
//           statValidateOption(myMDfiles)
//           .then(data => resolve(console.log(clc.magentaBright(`
//           ▂ ▃ ▅ ▆ █ Validación y stats de Links █ ▆ ▅ ▃ ▂  
//           `))
//           ,console.table(data)))
//           .catch((err)=> reject(err))
//       })
//   } else {
//       return new Promise((resolve, reject) => {
//           getLinksInfo(myMDfiles)
//               .then(data => resolve(console.log(clc.magentaBright(`
//               ▂ ▃ ▅ ▆ █ Links encontrados █ ▆ ▅ ▃ ▂  
//               `),
//               data)))
//               .catch(err => reject(err))
//       })
//   }
// }

// mdLinks(myMDfiles, optionsUser)
// .then(data => data)
// .catch(error => console.log(error))

module.exports = { mdLinks }