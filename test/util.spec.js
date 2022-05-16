import { getAbsolutePath, fileExists, readFile } from '../util.js'

const routeTest = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\MD3.md'

describe('getAbsolutePath', () => {
  it('Show resolve path in windows', () => {
    expect(getAbsolutePath('./MD3.md')).toBe(routeTest)
  })
});

describe ('fileExists', () => {
    it('show if the file of the route exists', () => {
        expect(fileExists('./MD3.md')).toBe(true);
    })
});

describe('readFile', () => {
    it('shows the content of the file',() =>{
        expect(readFile('./MD3.md')).toBe('pruebita pruebota')
    })
});

