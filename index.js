import { getAbsolutePath, fileExists, getMdRoutes, extractLinks, validateLinks, getStats } from './util.js';

export const mdLinks = (route, options) => new Promise((resolve, reject) => {
  if (!route) {
    console.log('no hay path'); // reject
    return;
  }
  const absolutePath = getAbsolutePath(route);
  if (!fileExists(absolutePath)) {
    console.log('La ruta no existe'); // reject
  }
  const mdRoutes = getMdRoutes(absolutePath);
  let foundLinks = [];
  mdRoutes.forEach(route => {
    foundLinks = foundLinks.concat(extractLinks(route));
  });

  if (options.validate) {
    validateLinks(foundLinks)
      .then(links => {
        let result = foundLinks;
        if (options.validate) {
          result = links;
        }
        if (options.stats) {
          result = getStats(result, options.validate);
        }
        resolve(result);
      })
      .catch(error => reject(error));
  } else {
    resolve(foundLinks);
  }
});
