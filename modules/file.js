const fs = require('fs');

fs.readFile('./myfile.txt', (err, data) => {
  if (err)
  {
    console.log(err);
  }
  
  console.log(data.toString());
});
