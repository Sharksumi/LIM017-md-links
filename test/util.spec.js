/* eslint-disable no-undef */
import { getAbsolutePath, fileExists, readFile} from '../util.js';

const routeTest = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\MD3.md';

describe('getAbsolutePath', () => {
  it('Show resolve path in windows', () => {
    expect(getAbsolutePath('./MD3.md')).toBe(routeTest);
  });
});

describe('fileExists', () => {
  it('it should return true is the file exists', () => {
    expect(fileExists('./MD3.md')).toBe(true);
  });
});

describe('readFile', () => {
  it('shows the content of the file', () => {
    expect(readFile(routeTest)).toBe('Texto prueba MD3');
  });
});

// describe('getMdRoutes', () => {
//   it('shows something', () => {
//     expect(getMdInfoOnArray(routeTest)).toBe('c');
//   });
// });
