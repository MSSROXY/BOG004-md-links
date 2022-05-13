const { mdLinks } = require('../mdlinks.js')

describe('funcion mdlinks', () => {
    it('es una función', () => {
        expect(typeof mdLinks).toBe('function');
    })
    it('con validate y stats false', () => {
        const userRoute = 'pruebas'
        const result1 = [
            {
              href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
              text: '1 link',
              file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/pruebas/prueba.md'
            }
          ];
        return mdLinks(userRoute, {validate: false, stats: false}).then((res) => {expect(res).toEqual(result1)
        })
    })
    it('con validate true y stats false', () => {
        const userRoute = 'pruebas'
        const result2 = [
            {
              href: 'https://www.youtube.com/watch?v=_Kqtj14rxes',
              text: '1 link',
              file: '/Users/roxysolanopino/Documents/Laboratoria/BOG004-md-links/pruebas/prueba.md',
              status: 200,
              statusText: 'OK'
            }
          ];
          return mdLinks(userRoute, {validate: true, stats: false}).then((res) => {expect(res).toEqual(result2)
        })
    });
    it('con validate false y stats true', () => {
        const userRoute = 'pruebas'
        const result3 = { Total: 1, Unique: 1 };
          return mdLinks(userRoute, {validate: false, stats: true}).then((res) => {expect(res).toEqual(result3)
        })
    });
    it('con validate true y stats true', () => {
        const userRoute = 'pruebas'
        const result3 = { Total: 1, Unique: 1, Broken: 0 };
          return mdLinks(userRoute, {validate: true, stats: true}).then((res) => {expect(res).toEqual(result3)
        })
    });
})