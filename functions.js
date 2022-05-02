// En este archivo van las funciones a usar
const fs = require('fs');
const path = require('path');
var clc = require('cli-color');
const [, ,route] = process.argv;

// función para convertir ruta relativa en absoluta
const routeAbsolute = (userRoute) => {
    if(path.isAbsolute(userRoute)){
        return userRoute;
    }
    else {
        const absPath = path.resolve(userRoute).normalize();
        return absPath;
    }
};

// guardo el resultado de la función en una variable
let myRoute = routeAbsolute(route);

// función recursiva para enlistar los archivos.md de un directorio en un array
// si se ingresa un archivo.md solo muestra el archivo

const listMDfiles = (userRoute) => {
    let MDfiles = [];
    if(fs.statSync(userRoute).isFile() && path.extname(userRoute) === '.md'){
        MDfiles.push(userRoute);
    }
    else{
        if(fs.statSync(userRoute).isDirectory()){
            const directory = userRoute;
            let contentDirectory = fs.readdirSync(directory);
            contentDirectory.forEach(elem => {
                listMDfiles(userRoute + '/' + elem).forEach(elem => {
                    MDfiles.push(elem);
                })
            })
        }
    }
    return MDfiles;
};

const myMDfiles = listMDfiles(myRoute);
console.log(clc.red.bgWhite('este es el resultado de la f recursiva: '), myMDfiles);

// empezamos con la promesa para leer los archivos que estan en un array
const readMDfiles = (MDarray) => {
    MDarray.forEach(md => {
        fs.promises.readFile(md, 'utf-8')
        .then((result)=> {
            console.log(clc.red.bgWhite('este es el contenido de cada archivo.md'), result)
        })
        .catch((error)=>{
            console.log('este es el error', error);
        })
    })
}

readMDfiles(myMDfiles)