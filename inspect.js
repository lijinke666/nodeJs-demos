const http = require('http');  
const PORT = 3000

//node --inspect  inspect.js

const server = http.createServer((req, res) => {   

    res.writeHead(200, { 'content-type': 'text/html' });   

    res.end('<h1>珂珂</h1>');  

});  

server.listen(PORT, () => {   

    console.log(`Listening on http://localhost:${PORT}`);  

});