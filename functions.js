
// En este archivo van las funciones a usar
const fs = require('fs');
var path = require('path');
var clc = require('cli-color');
const { promisify } = require('util');
const { resolve } = require('path');
const axios = require('axios').default;

const [, ,route, ...options] = process.argv;

// función para convertir ruta relativa en absoluta
const routeAbsolute = (userRoute) => {
    if(path.isAbsolute(userRoute)){
        return userRoute;
    }
    else {
        const absPath = path.resolve(userRoute)
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

// promesa de lectura de archivos

const readMDfiles = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(mdFile, 'utf-8')
        .then(resp => resolve({
            fileContent : resp,
            route : mdFile
        }))
        .catch(() => reject('No se puede leer el archivo suministrado'))
    })
}

// Promise.all(myMDfiles.map(readMDfiles))
// .then(data => console.log(data))
// .catch(error => console.log(error))
// // *******************************************************************************
// const getLinks = (object) => {
//     const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
//     const matchLinks = object.fileContent.match(expLink);
//     const singleLink = /\[([^\[]+)\]\((.*)\)/
//     const finalObject = matchLinks.map((fullLink => {
//         let text = singleLink.exec(fullLink);
//         return ({
//             href : text[2],
//             text : text[1],
//             file : object.route
//         })
//     }))
//     return finalObject
// }


// const mdLinks = (array) => {
//     return new Promise((resolve, reject) => {
//         Promise.all(array.map(readMDfiles))
//         .then(res => resolve(res.map(getLinks)))
//         .catch(() => reject('error de funcion prueba'))
//     })
// }

// mdLinks(myMDfiles)
// .then(result => console.log('tu resultado es: ',result))
// .catch(error => console.log(error))

//*****************************************************************************+ */

const validateHttp = (url, text, file ) => {
  return new Promise((resolve, reject) => {
      axios.get(url)
      .then(res => resolve({
         href : url,
         text : text,
         file : file,
         status : res.status,
         statusText: res.statusText
      }))
      .catch(()=> reject({
          href : url,
          text : text,
          file : file,
          status : 404,
          ok :'FAIL'
      }))
  })
}


// ************************************************+
// al resolver todas las promesas sigue haciendo lo que indicamos en el then

// empezamos con la promesa para leer los archivos que estan en un array
let linksMD = []; //array para enlistar los links
let routeMD = []; //array para enlistar la ruta de los archivos.md
let resultMD = []; //este será mi resultado

// const mdLinks = (array) => {
//     return new Promise((resolve,reject) => {
//         Promise.all(array.map(readMDfiles))
//         .then((data) => {
//             const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
//             data.forEach(item => {
//                 let matchLinks = [... item.fileContent.toString().match(expLink)];
//                 console.log(matchLinks);
//             })
//         })
//         .catch(error => reject(error))
//     })
// }

const mdLinks = (array, options) => {
    if (options == '--validate') {
        return new Promise((resolve,reject) => {
            Promise.all(array.map(readMDfiles))
            .then((data) => { 
                const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
                data.forEach(item => {
                    const matchLinks = [... item.fileContent.toString().match(expLink)];
                    matchLinks.forEach(link => {
                        linksMD.push(link);
                        routeMD.push(item.route)
                    });
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
                return(resultMD)
            })
            .then(final => Promise.allSettled(final.map(el => validateHttp(el.href, el.text, el.file))))
            .then(dataFinal => resolve(dataFinal.map(el => el.value || el.reason)))
            .catch(error => reject(error))
        })
    } else if (options == '--stats') {
        return new Promise((resolve,reject) => {
            Promise.all(array.map(readMDfiles))
            .then((data) => { 
                const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
                data.forEach(item => {
                    const matchLinks = [... item.fileContent.toString().match(expLink)];
                    matchLinks.forEach(link => {
                        linksMD.push(link);
                        routeMD.push(item.route)
                    });
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
                return(resultMD)
            })
            .then(final => Promise.allSettled(final.map(el => validateHttp(el.href, el.text, el.file))))
            .then(dataFinal => dataFinal.map(el => el.value || el.reason))
            .then(dataStats => {
                const totalLinks = dataStats.length;
                const unique = [...new Set(dataStats.map(link => link.href))];
                const uniqueLinks = unique.length;
                resolve({
                    Total : totalLinks,
                    Unique : uniqueLinks
                })
            })
            .catch(error => reject(error))
        })
    } else if(options.includes('--validate' && '--stats')) {
        return new Promise((resolve,reject) => {
            Promise.all(array.map(readMDfiles))
            .then((data) => { 
                const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
                data.forEach(item => {
                    const matchLinks = [... item.fileContent.toString().match(expLink)];
                    matchLinks.forEach(link => {
                        linksMD.push(link);
                        routeMD.push(item.route)
                    });
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
                return(resultMD)
            })
            .then(final => Promise.allSettled(final.map(el => validateHttp(el.href, el.text, el.file))))
            .then(dataFinal => dataFinal.map(el => el.value || el.reason))
            .then(dataStatsV => {
                const totalLinks = dataStatsV.length;
                const unique = [...new Set(dataStatsV.map(link => link.href))];
                const uniqueLinks = unique.length;
                const broken = dataStatsV.filter(link => link.statusText != 'OK');
                const brokenLinks = broken.length;
                resolve({
                    Total : totalLinks,
                    Unique : uniqueLinks,
                    Broken : brokenLinks
                })
            })
            .catch(error => reject(error))
        })
    } else {
        return new Promise((resolve,reject) => {
            Promise.all(array.map(readMDfiles))
            .then((data) => { 
                const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
                data.forEach(item => {
                    const matchLinks = [... item.fileContent.toString().match(expLink)];
                    matchLinks.forEach(link => {
                        linksMD.push(link);
                        routeMD.push(item.route)
                    });
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
            .catch(error => reject(error))
        })
    }
}

// const mdLinks = (array,options) => {
//     switch (options) {
//         case '--validate':{
//             return new Promise((resolve,reject) => {
//                 Promise.all(array.map(readMDfiles))
//                 .then((data) => { 
//                     const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
//                     data.forEach(item => {
//                         const matchLinks = [... item.fileContent.toString().match(expLink)];
//                         matchLinks.forEach(link => {
//                             linksMD.push(link);
//                             routeMD.push(item.route)
//                         });
//                     })
//                     resultMD = linksMD.map((totalLink) => {
//                         let index = linksMD.indexOf(totalLink);
//                         const splitLink = totalLink.split('](');
//                         const text = splitLink[0].slice(1);
//                         const href = splitLink[1].slice(0, -1);
                                    
//                         return {
//                             href,
//                             text,
//                             file : routeMD[index]
//                             }
//                     })
//                     return(resultMD)
//                 })
//                 .then(final => Promise.allSettled(final.map(el => validateHttp(el.href, el.text, el.file))))
//                 .then(dataFinal => resolve(dataFinal.map(el => el.value || el.reason)))
//                 .catch(error => reject(error))
//             });
//         }
//         case '--stats' :{
//             console.log('probando');
//             break;
//         }
//         case '--validate' && '--stats':{
//             return new Promise((resolve,reject) => {
//                 Promise.all(array.map(readMDfiles))
//                 .then((data) => { 
//                     const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
//                     data.forEach(item => {
//                         const matchLinks = [... item.fileContent.toString().match(expLink)];
//                         matchLinks.forEach(link => {
//                             linksMD.push(link);
//                             routeMD.push(item.route)
//                         });
//                     })
//                     resultMD = linksMD.map((totalLink) => {
//                         let index = linksMD.indexOf(totalLink);
//                         const splitLink = totalLink.split('](');
//                         const text = splitLink[0].slice(1);
//                         const href = splitLink[1].slice(0, -1);
                                    
//                         return {
//                             href,
//                             text,
//                             file : routeMD[index]
//                             }
//                     })
//                     return(resultMD)
//                 })
//                 .then(final => Promise.allSettled(final.map(el => validateHttp(el.href, el.text, el.file))))
//                 .then(dataFinal => dataFinal.map(el => el.value || el.reason))
//                 .then(dataStatsV => {
//                     const totalLinks = dataStatsV.length;
//                     const unique = [...new Set(dataStatsV.map(link => link.href))];
//                     const uniqueLinks = unique.length;
//                     const broken = dataStatsV.filter(link => link.statusText != 'OK');
//                     const brokenLinks = broken.length;
//                     resolve({
//                         Total : totalLinks,
//                         Unique : uniqueLinks,
//                         Broken : brokenLinks
//                     })
//                 })
//                 .catch(error => reject(error))
//             })
//         }
//         default:
//             return new Promise((resolve,reject) => {
//                 Promise.all(array.map(readMDfiles))
//                 .then((data) => { 
//                     const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
//                     data.forEach(item => {
//                         const matchLinks = [... item.fileContent.toString().match(expLink)];
//                         matchLinks.forEach(link => {
//                             linksMD.push(link);
//                             routeMD.push(item.route)
//                         });
//                     })
//                     resultMD = linksMD.map((totalLink) => {
//                         let index = linksMD.indexOf(totalLink);
//                         const splitLink = totalLink.split('](');
//                         const text = splitLink[0].slice(1);
//                         const href = splitLink[1].slice(0, -1);
                                    
//                         return {
//                             href,
//                             text,
//                             file : routeMD[index]
//                             }
//                     })
//                     resolve(resultMD)
//                 })
//                 .catch(error => reject(error))
//             })
//     }
// }

mdLinks(myMDfiles, options)
.then(data => console.log(data))
.catch(error => console.log(error))
//****************************************************** */