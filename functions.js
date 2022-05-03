// En este archivo van las funciones a usar
const fs = require('fs');
const path = require('path');
var clc = require('cli-color');
const { resolve } = require('path');
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
// guardo el resultado de la función pásandole como argumento la ruta absoluta
const myMDfiles = listMDfiles(myRoute);

// empezamos con la promesa para leer los archivos que estan en un array
let linksMD = []; //array para enlistar los links
let routeMD = []; //array para enlistar la ruta de los archivos.md
let objectMD = {}; //este será mi objeto resultado

const readMDfiles = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdFile, 'utf-8', (error,data) => {
            if (error) return reject(error);
            else return resolve(data);
        })
    })
}

Promise.all(myMDfiles.map(readMDfiles))
.then((data) => {
    const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
    const matchLinks = [... data.toString().match(expLink)];

        matchLinks.forEach(link => {
            linksMD.push(link);
        });

    // console.log(linksMD)
    // return linksMD

    objectMD = linksMD.map((url) => {
        let index = linksMD.indexOf(url);
        const splitLink = url.split('](');
        const text = splitLink[0].slice(1);
        const href = splitLink[1].slice(0, -1);
                    
        return {
            href,
            text,
            // file : routeMD[index],
            }
    })
    console.log(objectMD);
    return objectMD
})
.catch(error => console.log(error))



    // mdArray.forEach(mdFile => {
    //     fs.promises.readFile(mdFile, 'utf-8')
    //     .then((result)=> {
    //         const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
    //         const matchLinks = [... result.match(expLink)];

    //         matchLinks.forEach(link => {
    //             linksMD.push(link);
    //             routeMD.push(mdFile);
    //         });

    //         objectMD = linksMD.map((url) => {
    //             let index = linksMD.indexOf(url);
    //             const splitLink = url.split('](');
    //             const text = splitLink[0].slice(1);
    //             const href = splitLink[1].slice(0, -1);
                
    //             return {
    //                 href,
    //                 text,
    //                 file : routeMD[index],
    //             }
    //         })
    //         console.log(objectMD);
    //     })
    //     .catch((error)=>{
    //         console.log('este es el error', error);
    //     })
    // })

// readMDfiles(myMDfiles);

