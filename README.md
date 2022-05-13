# Markdown Links

## Índice

* [1. Introducción a md-links](#1-introducción)
* [2. Instalación](#2-instalación)
* [3. Guía de uso](#3-guía-de-uso)
* [4. Recursos](#4-recursos)

***

## 1. Introducción a mdLinks

Los archivos [markdown](https://es.wikipedia.org/wiki/Markdown) son un lenguaje de marcado ligero muy popular entre developers, estos normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

La librería mdLinks permite leer y analizar archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.


## 2. Instalación

Para la instalación de la librería deberá escribir el siguiente comando en la terminal: 

<p> `npm i md-links-mssroxy`

Una vez instalada ya puede empezar a usarla.


## 3. Guía de uso

Para hacer uso de la librería escriba la siguiente línea de comando: 
`md-links <path-to-file> --validate --stats`

Donde: 

- `md-links` hace el llamado a la librería
- `<path-to-file>` es la ruta hacia el archivo o directorio que se quiere analizar (recuerde que sólo se leen archivos markdown) 
- `--validate` argumento que puede estar presente(true) o no (false)
- `--stats` se comporta igual al anterior


### Retornos

#### `<path-to-file>` : no ingresa ninguna opción, no se realiza ninguna validación

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

![no-option](https://github.com/MSSROXY/BOG004-md-links/blob/development/img/no%20options.png)

#### `<path-to-file> --validate || <path-to-file> --v` : se solicita validación de cada link encontrado

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

![validate-option](https://github.com/MSSROXY/BOG004-md-links/blob/development/img/only%20validate.png)

#### `<path-to-file> --stats || <path-to-file> --s` : se solicita estadísticas de los links

* `Total`: Cantidad de links encontrados
* `Unique` : Cantidad de links únicos

![stats-option](https://github.com/MSSROXY/BOG004-md-links/blob/development/img/only%20stats.png)

#### `<path-to-file> --validate --stats || <path-to-file> --v --s` : se solicita validación y estadísticas de los links

* `Total`: Cantidad de links encontrados
* `Unique` : Cantidad de links únicos
* `Broken` : Cantidad de links rotos encontrados

![validate-stats-option](https://github.com/MSSROXY/BOG004-md-links/blob/development/img/validate%20y%20stats.png)

### Consideraciones

* Se aceptan rutas absolutas o relativas (recuerde que si es relativa se resuelve como relativa al directorio desde donde se invoca node)
* Si se ejecuta en windows se recomienda el uso de la terminal GitBash con el `<path-to-file>` entre comillas 


## 4. Recursos

* Si desea saber más sobre la ruta de trabajo utilizada, puede hacerlo a través del [flujograma de procesos](https://www.figma.com/file/RgSVheKsKjoWWmH3tgg0sV/Diagrama-de-flujo-MDLinks?node-id=0%3A1) desarrolado en Figma
* Autor: Roxy Solano (Laboratoria - Cohort BOG-004)


