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

//funcion 2 mdlinks 
const mdLinks = (path , options) => {
    return new Promise ((resolve, reject) => {
        //convierto la ruta en absoluta
        let myRoute = routeAbsolute(path);
        // obtengo myMDfiles que tiene un array de archivos md
        const myMDfiles = listMDfiles(myRoute);
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


mdLinks(route, { validate, stats })
.then(data => console.log(data))
.catch(err => console.log(err))


module.exports = { mdLinks }