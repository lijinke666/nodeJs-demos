const http = require('http')
const net = http.createServer((req,res)=>{
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('李金珂');
})


net.listen(1996,()=>{
    console.log('start...')
})