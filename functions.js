
// En este archivo van las funciones a usar
const fs = require('fs');
var path = require('path');
var clc = require('cli-color');
const { promisify } = require('util');
const { resolve } = require('path');
const axios = require('axios').default;

// función para convertir ruta relativa en absoluta
const routeAbsolute = (userRoute) => {
    if(path.isAbsolute(userRoute)){
        return userRoute;
    }
    if(!fs.existsSync(userRoute)){
        console.log(clc.red(`
        ╔════════════════════════════════════════════╗ 
        ║ La ruta ingresada no es válida o no existe ║ 
        ╚════════════════════════════════════════════╝ `));
        process.exit()
     }
    else {
        const absPath = path.resolve(userRoute)
        return absPath;
    }
};

// función recursiva para enlistar los archivos.md de un directorio en un array
// si se ingresa un archivo.md solo muestra el archivo

const listMDfiles = (userRoute) => {
    const separator = process.platform === "win32" || process.platform === "win64" ? "\\" : "/";
    let myMdfiles = [];
    if(fs.statSync(userRoute).isFile() && path.extname(userRoute) === '.md'){
        myMdfiles.push(userRoute);
    }
    else if(fs.statSync(userRoute).isDirectory()){
        const directory = userRoute;
        let contentDirectory = fs.readdirSync(directory);
        contentDirectory.forEach(elem => {
            listMDfiles(userRoute + separator + elem).forEach(elem => {
                myMdfiles.push(elem);
            })
        })
    }
    if(myMdfiles.length === 0){
        console.log(clc.red(`
        ╔═════════════════════════════════════╗ 
        ║ No se encontraron archivos markdown ║ 
        ╚═════════════════════════════════════╝ `))
        process.exit()
    }
    return myMdfiles;
};

// promesa de lectura de archivos

const readMDfiles = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(mdFile, 'utf-8')
        .then(resp => resolve({
            fileContent : resp,
            route : mdFile
        }))
        .catch(() => reject('Error del readFile'))
    })
}

// empezamos con la promesa para leer los archivos que estan en un array

const getLinksInfo = (array) => {
    let linksMD = []; //array para enlistar los links
    let routeMD = []; //array para enlistar la ruta de los archivos.md
    let resultMD = []; //este será mi resultado
    return new Promise((resolve,reject) => {
        Promise.all(array.map(readMDfiles))
        .then(data => {
            const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
            data.forEach(item => {
                const matchLinks = item.fileContent.match(expLink);
                if(matchLinks){
                    matchLinks.forEach(link => {
                        linksMD.push(link);
                        routeMD.push(item.route)
                    });
                }
            })
            resultMD = linksMD.map((totalLink) => {
                let index = linksMD.indexOf(totalLink);
                const splitLink = totalLink.split('](');
                const text = splitLink[0].slice(1);
                const href = splitLink[1].slice(0, -1);
                            
                return {
                    href,
                    text,
                    file : routeMD[index]
                    }
            })
            resolve(resultMD)
        })
        .catch((err) => reject('Error del getLinks',err))
    })
} 

const validateHttp = (url, text, file) => {
  return new Promise((resolve, reject) => {
      axios.get(url)
      .then(res => resolve({
          href : url,
          text,
          file,
          status: res.status,
          statusText: res.statusText
      }))
      .catch(err => reject({
          href: url,
          text,
          file,
          status: 404,
          statusText: 'FAIL'
      }))
  })
}

module.exports = {
    routeAbsolute,
    listMDfiles,
    getLinksInfo,
    validateHttp,
    clc
}
