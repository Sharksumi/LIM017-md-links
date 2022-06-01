import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

let linksArray = [];

export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
export const fileExists = (route) => fs.existsSync(route); // booleano
export const readFile = (route) => fs.readFileSync(route, 'utf-8'); // contenido del archivo

export const getMdRoutes = (route) => {
  let mdRoutes = [];

  if(fs.statSync(route).isFile()){
    if (path.extname(route) === '.md') { // para saber si es archivo md
      mdRoutes.push(route); // push the urls to the empty array
    }
  } else {
    const dirList = fs.readdirSync(route);
    dirList.forEach(dir => {
      const concatPath = path.join(route, dir);
      mdRoutes = mdRoutes.concat(getMdRoutes(concatPath));
    });
  }
  return mdRoutes;
};

export const extractLinks = (routeWithLink) => {
  const foundLinks = [];
  const linkPattern = /\[([^\[]+)\](\(.*\))/gm; // patrón de links global y multilinea
  const contentLinkPattern = /\[([^\[]+)\]\((.*)\)/; // patrón de links en regex

  const fileContent = readFile(routeWithLink); // contenido total del documento md
  const linksOnMd = fileContent.match(linkPattern); // comprueba si hay links en el md
  if (linksOnMd !== null) { // si no hay links retorna null
    linksOnMd.forEach(link => { // recorrer cada MD con links en el contenido
      const foundContentInfo = link.match(contentLinkPattern); // Hacerle match a los links en el contenido con el patrón para reconocer cada uno de los links
      foundLinks.push({ // pushear la info en el siguiente orden:
        href: foundContentInfo[2],
        text: foundContentInfo[1],
        file: routeWithLink
      });
    });
  }
  return foundLinks;
};
// links array tiene objetos
export const validateLinks = async (linksArray) =>{
  const validatedLinksArray = [];
  for (const object of linksArray) {
    const fetched = fetch(object.href)
      .then(response => {
        return {
          status: response.status,
          ok: response.status === 200 ? 'ok' : 'fail'
        };
      })
      .catch(error => console.log(error));
    validatedLinksArray.push({   // juntar un objeto con otro.
      ...object,          // poner los ... para agregar las propiedades de un objeto a uno nuevo
      ... await fetched   // lo mismo con el segundo objeto
    });
  };
  return validatedLinksArray;
}

export const getStats = (linksArray, validate) =>{
  let uniqueLinksArray = [...new Map(linksArray.map(item => [ item ['href'], item])).values()];

  let brokenLinksArray = [];
  if(validate){
    brokenLinksArray = uniqueLinksArray.filter((value) => value.status !== 200) // si no es de los unicos remplazar finalstats x result
  }
  return {
    total: linksArray.length,
    unique: uniqueLinksArray.length,
    broken: validate ? brokenLinksArray.length : 0
  };
}


