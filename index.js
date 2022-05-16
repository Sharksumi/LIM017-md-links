import path from 'path'
import process from 'process'
import * as fs from 'fs'
import { getAbsolutePath } from './util.js'
// const path = require('path');

// module.exports  = () => {
// mdLinks;
// }

const mdLinks = (route, options) => {
  if (!route) {
    console.log('no hay path')
    return
  }
  console.log(getAbsolutePath(route));
}

//  Agarra segundo argumento de la terminal
mdLinks(process.argv[2])
