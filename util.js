import path from 'path';
import fs from 'fs';

export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
export const fileExists = (route) => fs.existsSync(route); // booleano
export const readFile = (route) => fs.readFileSync(route, 'utf-8'); // contenido del archivo

const linksList = [];

const routeTest2 = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\example';

const goToDirectory = (route) => {
  const dirList = fs.readdirSync(route);
  console.log(dirList);
  dirList.forEach(dir => {
    const concatPath = path.join(route, dir);
    if (fs.statSync(concatPath).isFile()) {
      console.log('Esta ruta es archivo', concatPath);
      if (path.extname(concatPath) === '.md') { // para saber si es archivo md
        linksList.push(concatPath);
      }
    } else {
      goToDirectory(concatPath);
    }
  });
};

goToDirectory(routeTest2);
console.log(linksList);

// function countDown (fromNumber) {
//   console.log(fromNumber);

//   const nextNumber = fromNumber - 1;

//   if (nextNumber > 0) {
//     countDown(nextNumber);
//   }
// }
