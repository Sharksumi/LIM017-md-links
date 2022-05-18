import path from 'path';
import fs from 'fs';

export const getAbsolutePath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
export const fileExists = (route) => fs.existsSync(route); // booleano
export const readFile = (route) => fs.readFileSync(route, 'utf-8'); // contenido del archivo

// no se guarda el valor porque no termina la promesa
// export const readFile = async (route) => await fs.readFile(route, (err, data) => {
//     if (err) return console.error(err);
//     console.log(data.toString());
//     return data.toString();
// });
