const mdLinks = require('../index');


describe('mdLinks', () => {

  it('Leer e imprimir todo el README.md', () => {
    // console.log(mdLinks);
    const resultado = mdLinks.read('README.md');
    expect(resultado).toBe('');
  });

});
