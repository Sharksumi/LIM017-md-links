import path from 'path';
import fs from 'fs';

export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
export const fileExists = (route) => fs.existsSync(route); // booleano
export const readFile = (route) => fs.readFileSync(route, 'utf-8'); // contenido del archivo

const mdRoutes = [];
const foundLinksAndText = [];

// funcion recursiva

const getMdRoutes = (route) => {
  const dirList = fs.readdirSync(route);
  dirList.forEach(dir => {
    const concatPath = path.join(route, dir);
    if (fs.statSync(concatPath).isFile()) { // caso base
      if (path.extname(concatPath) === '.md') { // para saber si es archivo md
        mdRoutes.push(concatPath);
      }
    } else {
      getMdRoutes(concatPath);
    }
  });
};

const extractLinks = (routeWithLink) => {
  const linkPattern = /\[([^\[]+)\](\(.*\))/gm;
  const infoPattern = /\[([^\[]+)\]\((.*)\)/;

  const fileContent = readFile(routeWithLink);
  const linksOnMd = fileContent.match(linkPattern);
  if (linksOnMd === null) {
    return 'En este Markdown no hay links';
  }
  linksOnMd.forEach(link => {
    const foundInfo = link.match(infoPattern);
    foundLinksAndText.push({
      href: foundInfo[2],
      text: foundInfo[1],
      file: routeWithLink
    });
  });
};

// -w- MDLinks
const mdLinks = () => {
  const routeTest2 = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\example';

  getMdRoutes(routeTest2);
  mdRoutes.forEach(route => {
    extractLinks(route);
  });
  console.log(foundLinksAndText);
};
mdLinks();
