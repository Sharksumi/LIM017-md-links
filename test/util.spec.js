/* eslint-disable no-undef */
import fetch from 'node-fetch';
import { getAbsolutePath, fileExists, readFile, validateLinks } from '../util.js';
jest.mock('node-fetch');

const routeTest = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\MD3.md';
const validateRouteArray = [
  {
    href: 'https://picsum.photos/id/1003/800/1200',
    text: 'Este es un venadito',
    file: '/home/pedro/repos/misc/kasu/LIM017-md-links/example/MD1.md'
  }
];
const objectResponse = [
  {
    href: 'https://picsum.photos/id/1003/800/1200',
    text: 'Este es un venadito',
    file: '/home/pedro/repos/misc/kasu/LIM017-md-links/example/MD1.md',
    status: 123,
    ok: 'fail'
  }

]

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

// test esta fallando en util lin 15 v

describe('readFile', () => {
  it('shows the content of the file', () => {
    expect(readFile(routeTest)).toBe('Texto prueba MD3');
  });
});

describe('validateLinks', () => {
  it('shows something', async () => {
    fetch.mockReturnValue(Promise.resolve({ status: 123 }));
    expect(await validateLinks(validateRouteArray)).toMatchObject(objectResponse);
  });
});
