import path from 'path'
import process from 'process'
import * as fs from 'fs'
import { getAbsolutePath, fileExists, readFile } from './util.js'


const mdLinks = (route, options) => {
  if (!route) {
    console.log('no hay path')
    return
  }
  console.log(getAbsolutePath(route));
  if (!fileExists){
    console.log('The file does not exist')
    return
  }
  console.log(readFile);
}

//  Agarra segundo argumento de la terminal
mdLinks(process.argv[2])


// module.exports = () => {
//   // ...
// };
