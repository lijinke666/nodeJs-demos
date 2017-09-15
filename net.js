const net = require('net')
const {promisify} = require("util")
const {PBSSMsg, GMRequestPlayerInfo} = require("./content")

const {
    buildHeaders,
    createBuffer
} = require('./buffer2.js')



const msgBuf = PBSSMsg.encode({ gmRequestPlayerInfo: {uid:222}}).finish();
// const msgBuf = GMRequestPlayerInfo.decode(GMRequestPlayerInfo.encode(testMsg).finish())
console.log('msg',msgBuf,msgBuf.length);

const headers = buildHeaders({uid:222,msgLength:msgBuf.length})
console.log('headers',headers.length);
const allBuffer = Buffer.concat([headers,msgBuf],headers.length + msgBuf.length)
console.log(allBuffer.length);


/**
 * 与 c++ 服务器 进行 tcp协议 通信
 */
const HOST = '192.168.2.154'
const PORT = 9002
// console.log(HEADERS,HEADERS.length);

// const client = new net.Socket()
// const client = net.createConnection(PORT,HOST)

const client = new net.Socket()

client.connect(PORT,HOST,()=>{
    client.write(allBuffer)
    console.log('连接成功!');
})

client.on('data',(data)=>{
    console.log( Buffer.isBuffer(data)); 
    var buf_len = data.readInt32BE(55);
    console.log('data===', buf_len);
    const buf2 = data.slice(55);
    var obj = PBSSMsg.decode(buf2, buf_len)
    obj = obj.gmResponsePlayerInfo
    console.log(obj);
    console.log(obj.info.uid);
    console.log(obj.info.diamond);
    // client.destroy()
})

client.on('error',(err)=>{
    console.log('error',err);
})

client.on('close',()=>{
    console.log("close");
})

// 00 00 00 3e 
// 00 00
//  00 00 00 00 
//  00 00 00 00 
//  00 00 00 00 00 00 00 de
//   00
//    00 00 00 00
//     00 00 00 00 00 00 00 00
//      00 00
//       75 30
//        00 00 
//        00 00 00 00 
//        00 
//        00 00 00 00
