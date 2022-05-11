const path = require('path');


// module.exports  = () => {
// mdLinks;
// }

const mdLinks = (route, options) => {
  if (!route) {
    console.log('no hay path');
    return ;
  }
  console.log(path.isAbsolute(route));
  const truePath = path.isAbsolute(route) ? route : path.resolve(route);
  console.log(truePath);
};

//Agarra segundo argumento de la terminal
mdLinks(process.argv[2]);



//pasar todo esto al CLI - despues de leer




