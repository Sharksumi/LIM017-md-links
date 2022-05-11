module.exports = () => {
  // ...


  const fs = require('fs');
  
  // Use fs.readFile() method to read the file
  fs.readFile('MD 1.txt', 'utf8', function(err, data){
        
      // Display the file content
      console.log(data);
  });
    
  console.log('readFile called');

  // const fs = require('fs');

// const path = process.argv[2];
// console.log(path);

// fs.readFile(path, 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// const read = (file) =>{
//   const result = 0
//   fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         // console.error(err);
//         return ;
//       }
//       // console.log(data);
//       return ;
//     });
//     return result;
// };

// exports.read = read;





// process.argv.forEach((val, index)=> {
// if (index > 1 ){
//   console.log(val);
// console.log(index);
// }
// });

// const nombredelafuncion  = (argumentos) => {
// ignorar 0 y 1 y agarrar los otros
// }
}