// si el usuario pasa options 
// cada una de las funciones recibe un array
// cuando le pase el argumento el array será el resultante de la funcion que retorna un array archivos de md (listMdfiles)

const {
    getLinksInfo,
    validateHttp
} = require('./functions')

const validateOption = (array) => {
    return new Promise((resolve,reject) => {
        getLinksInfo(array)
        .then(data => Promise.allSettled(data.map(el => 
            validateHttp(el.href, el.text, el.file)
        )))
        .then(dataF => resolve(dataF.map(el => el.value || el.reason)))
        .catch(err => reject(err, 'Error del validateOption'))
    })
}

const statOption = (array) => {
    return new Promise ((resolve, reject) => {
        validateOption(array)
        .then(data => {
            const totalLinks = data.length;
            const unique = [...new Set(data.map(link => link.href))];
            const uniqueLinks = unique.length;
            resolve({
                Total : totalLinks,
                Unique : uniqueLinks
                })
            })
        .catch(() => reject('Error del statOption'))
    })
}

const statValidateOption =(array) => {
    return new Promise ((resolve, reject) => {
        validateOption(array)
        .then(data => {
            const totalLinks = data.length;
            const unique = [...new Set(data.map(link => link.href))];
            const uniqueLinks = unique.length;
            const broken = data.filter(link => link.statusText != 'OK');
            const brokenLinks = broken.length;
            resolve({
                Total : totalLinks,
                Unique : uniqueLinks,
                Broken : brokenLinks
                })
            })
        .catch(() => reject('Error del statValidateOption'))
    })
}

module.exports = {
    validateOption,
    statOption,
    statValidateOption
}

