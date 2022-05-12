const routeAbsolute = require('../functions.js').routeAbsolute;
const listMDfiles = require('../functions.js').listMDfiles;
const getLinksInfo = require('../functions.js').getLinksInfo

describe("Validación de la ruta ", () => {
  it("routeAbsolute es una función", () => {
    expect(typeof routeAbsolute).toBe("function");
  });

  it("recibe una ruta relativa y la convierte a absoluta", () => {
    let userPathTest = 'resources/prueba.md';
    let result = '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md';
    expect(routeAbsolute(userPathTest)).toEqual(result);
  });
});

describe("Listar los archivos markdown", () => {
  it("listMDfiles es una función", () => {
    expect(typeof listMDfiles).toBe("function");
  });

  it("recibe una ruta, tiene que entrar al directorio y encontrar los archivos md", () => {
    let userRoute = 'resources';
    let result = [
      'resources/prueba.md',
      'resources/prueba2.md',
      'resources/prueba3.md',
      'resources/prueba4.md'
    ]
    expect(listMDfiles(userRoute)).toEqual(result);
  });
})

describe("Retornar un objeto con información de links ", () => {
  test('getLinksInfo me retorna un objeto', () => {
    let arrayMD = [
      '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md',
      '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md',
      '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md',
      '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba4.md'
    ];
    let myLinks = [
      {
        href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
        text: '1 link',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
      },
      {
        href: 'https://pandao.github.io/editor.md/en.html',
        text: '2 link',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
      },
      {
        href: 'https://www.profesionalreview.com/2019/10/19/error-400-bad-request/EXAMPLE',
        text: '3 link',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
      },
      {
        href: 'https://www.profesionalreview.com/2019/10/19/error-400-bad-request/EXAMPLE',
        text: '4 link',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md'
      },
      {
        href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
        text: 'Youtube',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md'
      },
      {
        href: 'https://www.facebook.com/roxysolano',
        text: 'Facebook',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba2.md'
      },
      {
        href: 'https://anexsoft.com/ejemplo-practico-de-promise-con-javascript',
        text: 'Promesas',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md'
      },
      {
        href: 'https://gist.github.com/Villanuevand/6386899f70346d4580c723232524d35a',
        text: 'Read-me en español',
        file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba3.md'
      }
    ]
    return getLinksInfo(arrayMD).then(res => {
      expect(res).toEqual(myLinks);
    })
  })
});


// describe("Archivos con extensión md", () => {
//   it("es una función", () => {
//     expect(typeof listMDfiles).toBe("function");
//   });

  // it("recibe una ruta relativa y la convierte a absoluta", () => {
  //   let userPathTest = 'resources/prueba.md';
  //   let result = '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/resources/prueba.md';
  //   expect(routeAbsolute(userPathTest)).toEqual(result);
//   // })
// });