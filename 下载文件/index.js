const fs = require('fs');
const download = require('download');

download('http://unicorn.com/foo.jpg').then(data => {
	fs.writeFileSync('dist/foo.jpg', data);
});