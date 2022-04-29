// En este archivo van las funciones a usar
const fs = require('fs');
const path = require('path');
var clc = require('cli-color');
const [, ,route] = process.argv;

// función para convertir ruta relativa en absoluta
const routeAbsolute = (route) => {
    if(path.isAbsolute(route)){
        return route;
    }
    else {
        const absPath = path.resolve(route).normalize();
        return absPath;
    }
};

// guardo el resultado de la función 
let myRoute = routeAbsolute(route);

// función recursiva para enlistar los archivos.md de un directorio en un array
// si se ingresa un archivo.md solo muestra el archivo

const listMDfiles = (myRoute) => {
    let myMDfiles = [];
    if(fs.statSync(myRoute).isFile() && path.extname(myRoute) === '.md'){
        myMDfiles.push(myRoute);
    }
    else{
        if(fs.statSync(myRoute).isDirectory()){
            const directory = myRoute;
            let contentDirectory = fs.readdirSync(directory);
            contentDirectory.forEach(elem => {
                listMDfiles(myRoute + '/' + elem).forEach(elem => {
                    myMDfiles.push(elem);
                })
            })
        }
    }
    return myMDfiles;
};

console.log(clc.red.bgWhite('este es el resultado de la f recursiva: '), listMDfiles(myRoute));