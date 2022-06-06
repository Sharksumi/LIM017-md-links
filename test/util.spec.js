/* eslint-disable no-undef */
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import { getAbsolutePath, fileExists, readFile, validateLinks, getMdRoutes, extractLinks, getStats } from '../util.js';

jest.mock('fs');
jest.mock('path');
jest.mock('node-fetch');

describe('getAbsolutePath', () => {
  const basePath = '/tests/fake-folder/';

  test('It should return the same path if is already an absolute path', () => {
    const fullPath = `${basePath}/test.md`;

    path.isAbsolute.mockReturnValue(true);
    expect(getAbsolutePath(fullPath)).toBe(fullPath);
  });

  test('It should return the resolved absolut path if is a relative path', () => {
    const fullPath = `${basePath}/test.md`;

    path.isAbsolute.mockReturnValue(false);
    path.resolve.mockReturnValue(fullPath);

    expect(getAbsolutePath('./test.md')).toBe(fullPath);
  });
});

describe('fileExists', () => {
  test('It should return true if the file exists', () => {
    fs.existsSync.mockReturnValue(true);
    expect(fileExists('.Test.md')).toBe(true);
  });

  test('It should return true if the file exists', () => {
    fs.existsSync.mockReturnValue(false);
    expect(fileExists('.Test.md')).toBe(false);
  });
});

describe('readFile', () => {
  it('It should return the file contents', () => {
    fs.readFileSync.mockReturnValue('Texto prueba MD3');
    expect(readFile('./MD3.md')).toBe('Texto prueba MD3');
  });
});

describe('getMdRoutes', () => {
  test('It should return a single element if parameter is File', () => {
    path.extname.mockImplementation((route) => {
      return route.substr(route.lastIndexOf('.'));
    });

    fs.statSync.mockReturnValue({ isFile: () => true });

    const mdFilesRoutes = getMdRoutes('/tests/files/test.md');

    expect(mdFilesRoutes).not.toBe(null);
    expect(mdFilesRoutes).not.toBe(undefined);

    expect(mdFilesRoutes).not.toBe([]);
    expect(mdFilesRoutes.length).toBe(1);

    expect(mdFilesRoutes[0].includes('.md')).toBe(true);
  });

  test('It should return an empty array if the only file is not an MD', () => {
    path.extname.mockImplementation((route) => {
      return route.substr(route.lastIndexOf('.'));
    });

    fs.statSync.mockReturnValue({ isFile: () => true });

    const mdFilesRoutes = getMdRoutes('/tests/files/test.mp3');

    expect(mdFilesRoutes).not.toBe(null);
    expect(mdFilesRoutes).not.toBe(undefined);
    expect(mdFilesRoutes).toStrictEqual([]);
  });

  test('It should return multiple elements if parameter is Directory', () => {
    path.extname.mockImplementation((route) => {
      return route.substr(route.lastIndexOf('.'));
    });

    path.join.mockImplementation((dir, file) => dir + file);

    fs.statSync.mockImplementation((route) => {
      if (route === '/tests/files/') {
        return { isFile: () => false };
      }

      return { isFile: () => true };
    });

    fs.readdirSync.mockReturnValue(['test-1.md', 'test-2.md']);

    const mdFilesRoutes = getMdRoutes('/tests/files/');

    expect(mdFilesRoutes).not.toBe(null);
    expect(mdFilesRoutes).not.toBe(undefined);

    expect(mdFilesRoutes).not.toBe([]);
    expect(mdFilesRoutes.length).toBe(2);

    expect(mdFilesRoutes[0].includes('.md')).toBe(true);
    expect(mdFilesRoutes[1].includes('.md')).toBe(true);
  });

  test('It should return multiple elements if parameter has nested Directories', () => {
    path.extname.mockImplementation((route) => {
      return route.substr(route.lastIndexOf('.'));
    });

    path.join.mockImplementation((dir, file) => dir + file);

    fs.statSync.mockImplementation((route) => {
      if (route === '/tests/files/' || route === '/tests/files/nested/') {
        return { isFile: () => false };
      }

      return { isFile: () => true };
    });

    fs.readdirSync.mockImplementation((route) => {
      if (route === '/tests/files/') {
        return ['nested/', 'test-1.md', 'test-2.md'];
      } else if (route === '/tests/files/nested/') {
        return ['nested-test.md'];
      }

      return null;
    });

    const mdFilesRoutes = getMdRoutes('/tests/files/');

    expect(mdFilesRoutes).not.toBe(null);
    expect(mdFilesRoutes).not.toBe(undefined);

    expect(mdFilesRoutes).not.toBe([]);
    expect(mdFilesRoutes.length).toBe(3);

    expect(mdFilesRoutes[0].includes('.md')).toBe(true);
    expect(mdFilesRoutes[1].includes('.md')).toBe(true);
    expect(mdFilesRoutes[2].includes('.md')).toBe(true);

    expect(mdFilesRoutes[0].includes('/nested/')).toBe(true);
  });
});

describe('extractLinks', () => {
  test('It should return an empty array when file has no links', () => {
    fs.readFileSync.mockReturnValue('This file has no links at all.');

    const extractedLinks = extractLinks('/tests/test.md');

    expect(extractedLinks).not.toBe(null);
    expect(extractedLinks).not.toBe(undefined);
    expect(extractedLinks).toStrictEqual([]);
  });

  test('It should return a single element when file has one link', () => {
    fs.readFileSync.mockReturnValue('[This is a Link](https://test-link.me)');

    const extractedLinks = extractLinks('/tests/test.md');

    expect(extractedLinks).not.toBe(null);
    expect(extractedLinks).not.toBe(undefined);
    expect(extractedLinks).not.toBe([]);

    expect(extractedLinks.length).toBe(1);

    expect(extractedLinks[0].href).toBe('https://test-link.me');
    expect(extractedLinks[0].text).toBe('This is a Link');
    expect(extractedLinks[0].file).toBe('/tests/test.md');
  });

  test('It should return a multiple element when file has many links', () => {
    fs.readFileSync.mockReturnValue('[This is a Link](https://test-link.me) \n[This is also a Link](https://test-link.me)');

    const extractedLinks = extractLinks('/tests/test.md');

    expect(extractedLinks).not.toBe(null);
    expect(extractedLinks).not.toBe(undefined);
    expect(extractedLinks).not.toBe([]);

    expect(extractedLinks.length).toBe(2);

    expect(extractedLinks[0].href).toBe('https://test-link.me');
    expect(extractedLinks[0].text).toBe('This is a Link');
    expect(extractedLinks[0].file).toBe('/tests/test.md');

    expect(extractedLinks[1].href).toBe('https://test-link.me');
    expect(extractedLinks[1].text).toBe('This is also a Link');
    expect(extractedLinks[1].file).toBe('/tests/test.md');
  });
});

describe('validateLinks', () => {
  test('It should return empty array if no links sent', async () => {
    const validatedLinks = await validateLinks([]);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);
    expect(validatedLinks).toStrictEqual([]);
  });

  test('It should return a single element if one link is sent', async () => {
    fetch.mockReturnValue(Promise.resolve({ status: 200 }));

    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md'
      }
    ];

    const validatedLinks = await validateLinks(linksArray);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);

    expect(validatedLinks.length).toBe(1);

    expect(validatedLinks[0].href).toBe(linksArray[0].href);
    expect(validatedLinks[0].text).toBe(linksArray[0].text);
    expect(validatedLinks[0].file).toBe(linksArray[0].file);
    expect(validatedLinks[0].ok).toBe('ok');
    expect(validatedLinks[0].status).toBe(200);
  });

  test('It should return a single failed element if one bad link is sent', async () => {
    fetch.mockReturnValue(Promise.resolve({ status: 404 }));

    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md'
      }
    ];

    const validatedLinks = await validateLinks(linksArray);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);

    expect(validatedLinks.length).toBe(1);

    expect(validatedLinks[0].href).toBe(linksArray[0].href);
    expect(validatedLinks[0].text).toBe(linksArray[0].text);
    expect(validatedLinks[0].file).toBe(linksArray[0].file);
    expect(validatedLinks[0].ok).toBe('fail');
    expect(validatedLinks[0].status).toBe(404);
  });

  test('It should return a multiple elements if many link are sent', async () => {
    fetch.mockReturnValue(Promise.resolve({ status: 200 }));

    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md'
      },
      {
        href: 'https://test-link-1.me',
        text: 'Test Link 1',
        file: '/tests/test.md'
      }
    ];

    const validatedLinks = await validateLinks(linksArray);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);

    expect(validatedLinks.length).toBe(2);

    expect(validatedLinks[0].href).toBe(linksArray[0].href);
    expect(validatedLinks[0].text).toBe(linksArray[0].text);
    expect(validatedLinks[0].file).toBe(linksArray[0].file);
    expect(validatedLinks[0].ok).toBe('ok');
    expect(validatedLinks[0].status).toBe(200);

    expect(validatedLinks[1].href).toBe(linksArray[1].href);
    expect(validatedLinks[1].text).toBe(linksArray[1].text);
    expect(validatedLinks[1].file).toBe(linksArray[1].file);
    expect(validatedLinks[1].ok).toBe('ok');
    expect(validatedLinks[1].status).toBe(200);
  });

  test('It should return a single failing element if one failing link is provided', async () => {
    fetch.mockReturnValue(Promise.reject(new Error('This is an error')));

    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md'
      }
    ];

    const validatedLinks = await validateLinks(linksArray);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);

    expect(validatedLinks.length).toBe(1);

    expect(validatedLinks[0].href).toBe(linksArray[0].href);
    expect(validatedLinks[0].text).toBe(linksArray[0].text);
    expect(validatedLinks[0].file).toBe(linksArray[0].file);
    expect(validatedLinks[0].ok).toBe(undefined);
    expect(validatedLinks[0].status).toBe(undefined);
  });

  test('It should return mixed elements if many links are sent', async () => {
    fetch.mockImplementation((location) => {
      if (location === 'https://test-link.me') {
        return Promise.resolve({ status: 200 });
      }

      return Promise.reject(new Error('This is an error'));
    });

    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md'
      },
      {
        href: 'https://test-link-1.me',
        text: 'Test Link 1',
        file: '/tests/test.md'
      }
    ];

    const validatedLinks = await validateLinks(linksArray);

    expect(validatedLinks).not.toBe(null);
    expect(validatedLinks).not.toBe(undefined);

    expect(validatedLinks.length).toBe(2);

    expect(validatedLinks[0].href).toBe(linksArray[0].href);
    expect(validatedLinks[0].text).toBe(linksArray[0].text);
    expect(validatedLinks[0].file).toBe(linksArray[0].file);
    expect(validatedLinks[0].ok).toBe('ok');
    expect(validatedLinks[0].status).toBe(200);

    expect(validatedLinks[1].href).toBe(linksArray[1].href);
    expect(validatedLinks[1].text).toBe(linksArray[1].text);
    expect(validatedLinks[1].file).toBe(linksArray[1].file);
    expect(validatedLinks[1].ok).toBe(undefined);
    expect(validatedLinks[1].status).toBe(undefined);
  });
});

describe('getStats', () => {
  test('It should return a result with zero on each attribute', () => {
    const linksStats = getStats([], false);

    expect(linksStats).not.toBe(null);
    expect(linksStats).not.toBe(undefined);

    expect(linksStats.total).toBe(0);
    expect(linksStats.unique).toBe(0);
    expect(linksStats.broken).toBe(0);
  });

  test('It should return one unique link if same link appears multiple times', () => {
    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 200,
        ok: 'ok'
      }
    ];
    const linksStats = getStats(linksArray, false);

    expect(linksStats).not.toBe(null);
    expect(linksStats).not.toBe(undefined);

    expect(linksStats.total).toBe(2);
    expect(linksStats.unique).toBe(1);
    expect(linksStats.broken).toBe(0);
  });

  test('It should return zero broken links if validate flag is false', () => {
    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 404,
        ok: 'fail'
      }
    ];
    const linksStats = getStats(linksArray, false);

    expect(linksStats).not.toBe(null);
    expect(linksStats).not.toBe(undefined);

    expect(linksStats.total).toBe(2);
    expect(linksStats.unique).toBe(1);
    expect(linksStats.broken).toBe(0);
  });

  test('It should return one broken link if validate flag is false', () => {
    const linksArray = [
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://test-link.me',
        text: 'Test Link',
        file: '/tests/test.md',
        status: 404,
        ok: 'fail'
      }
    ];
    const linksStats = getStats(linksArray, true);

    expect(linksStats).not.toBe(null);
    expect(linksStats).not.toBe(undefined);

    expect(linksStats.total).toBe(2);
    expect(linksStats.unique).toBe(1);
    expect(linksStats.broken).toBe(1);
  });
});
