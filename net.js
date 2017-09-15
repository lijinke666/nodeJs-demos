const net = require('net')

/**
 * 与 c++ 服务器 进行 tcp协议 通信
 */
const HOST = '192.168.2.154'
const PORT = 9002


var x = 0;
// const client = new net.Socket()
const client = net.createConnection(PORT,HOST)

client.on("connect",()=>{
    console.log('连接成功');
    var g = new Buffer(6);
    g.writeInt32BE(2, 0);
    g.writeInt16BE(2, 4);
    console.log(g);
    client.write(g);
})

client.on('data',(data)=>{
    console.log('data',data);
})

client.on('close',()=>{
    console.log('连接关闭');
})


setTimeout(()=>{
    console.log('ghjgjkhkljhlhlkh');
    client.end('')
},8000)
