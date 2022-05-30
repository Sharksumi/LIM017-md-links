import process from 'process';
import { getAbsolutePath, fileExists, getMdRoutes, extractLinks, validateLinks, getStats } from './util.js';

export const mdLinks = async (route, options) => {
  if (!route) {
    console.log('no hay path');
    return;
  }
  const absolutePath = getAbsolutePath(route);
  if (!fileExists(absolutePath)) {
    console.log('La ruta no existe');
  }
  const mdRoutes = getMdRoutes(absolutePath);
  let foundLinks = [];
  let stats = {};
  mdRoutes.forEach(route => {
    foundLinks = foundLinks.concat(extractLinks(route));
  });

  if (options.validate) {
    foundLinks = await validateLinks(foundLinks);
  }
  if (options.stats) {
    stats = getStats(foundLinks, options.validate);
  }
  console.log(foundLinks);
  console.log(stats);
};

const commandArg = process.argv; // mover a cli

let validate = false;
const foundValidate = commandArg.find((option) => option === '--validate');

validate = foundValidate === '--validate';

// Stats

let stats = false;
const foundStats = commandArg.find((option) => option === '--stats');

// stats = !!found; // doble negación
stats = foundStats === '--stats';

mdLinks(process.argv[2], { validate, stats });
