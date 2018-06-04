//tcp 服务端

const net = require('net')

const server = net.createServer((socket)=>{
  socket.on('data',(data)=>{
     console.log('data:',data+"");
     socket.end('测试')
  })
})

server.on('error',(err)=>{
  console.log('err',err);
})

server.listen({
  host: 'localhost',
  port: 8081
});