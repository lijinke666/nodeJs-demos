const fs = require('fs');
const path = require('path');

fs.createReadStream(path.resolve(process.cwd(), './hello.js'))
  .pipe(fs.createWriteStream('./hello.copy.js'))
  .on('finish', () => {
    console.log('Copy complete');
  });
