import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';


export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
export const fileExists = (route) => fs.existsSync(route); // booleano
export const readFile = (route) => fs.readFileSync(route, 'utf-8'); // contenido del archivo

const mdRoutes = [];
const command = process.argv[2];
let result = [];

// funcion recursiva

const getMdRoutes = (route) => {
  const dirList = fs.readdirSync(route);
  dirList.forEach(dir => { // recorrer el directorio
    const concatPath = path.join(route, dir);
    if (fs.statSync(concatPath).isFile()) { // caso base
      if (path.extname(concatPath) === '.md') { // para saber si es archivo md
        mdRoutes.push(concatPath); // push the urls to the empty array
      }
    } else {
      getMdRoutes(concatPath); // Recorre nuevamente el directorio, pero con la nueva ruta
    }
  });
};

const extractLinks = (routeWithLink) => {
  const linkPattern = /\[([^\[]+)\](\(.*\))/gm; // patrón de links global y multilinea
  const contentLinkPattern = /\[([^\[]+)\]\((.*)\)/; // patrón de links en regex

  const fileContent = readFile(routeWithLink); // contenido total del documento md
  const linksOnMd = fileContent.match(linkPattern); // comprueba si hay links en el md
  if (linksOnMd === null) { // si no hay links retorna null
    return 'En este Markdown no hay links';
  }

  linksOnMd.forEach(link => { // recorrer cada MD con links en el contenido
    const foundContentInfo = link.match(contentLinkPattern); // Hacerle match a los links en el contenido con el patrón para reconocer cada uno de los links
    result.push({ // pushear la info en el siguiente orden:
      href: foundContentInfo[2],
      text: foundContentInfo[1],
      file: routeWithLink
    });
  });
};

// -w- MDLinks??

export const getMdInfoOnArray = () => {
  getMdRoutes(command);
  mdRoutes.forEach(route => {
    extractLinks(route);
  });
  // console.log(foundLinksAndText);
};
getMdInfoOnArray();

// 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\example'

const comandos = process.argv;

let validate = false;
const found = comandos.find((option) => option === '--validate');

// validate = !!found; // doble negación
validate = found === '--validate';



if (validate) {
  const arrayVacio = [];
  for (const object of result) {
    const fetched = fetch(object.href)
      .then(response => {
        return {
          status: response.status,
          ok: response.status === 200 ? 'ok' : 'fail'
        };
      })
      .catch(error => console.log(error));
      arrayVacio.push({   // juntar un objeto con otro.
      ...object,          // poner los ... para agregar las propiedades de un objeto a uno nuevo
      ... await fetched   // lo mismo con el segundo objeto
    })
    // console.log(await fetched);
  };
  result = arrayVacio;
}

const stats = result.map(item => item.href)


console.log(stats);
// console.log(result);


