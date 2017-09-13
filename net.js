const net = require('net')

/**
 * 与 c++ 服务器 进行 tcp协议 通信
 */
const HOST = '192.168.2.154'
const PORT = 9002

const client = new net.Socket()

client.connect(PORT,HOST,()=>{
    console.log('连接成功');
})

client.on('data',(data)=>{
    console.log('data',data);
})

client.on('close',()=>{
    console.log('连接关闭');
})