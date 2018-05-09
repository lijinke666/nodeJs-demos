//buffer 拼接 中文字符串的问题
const fs = require('fs')
// const buf = Buffer.alloc(3)
// console.log(Buffer.isEncoding('utf-8'));

// const buf2 = Buffer.from(buf,'utf-8')
// const buf3 = Buffer.from('test')

// console.log(buf2,buf3);

//解析 win1256 的格式
console.log(Buffer.isEncoding('win1256'));        //不支持
console.log(Buffer.isEncoding('utf8'));        //支持

const data = fs.createReadStream('./testBuffer.md')

//错误的
// let file = ""

// data.on("data",(chunk)=>{
//     file+=chunk       //如果+=  会有隐式的 toString()
// })
// data.on('end',()=>{
//     console.log(file);
// })

//正确的方式

const chunks = []
let size = 0
data.on("data",(chunk)=>{
    chunks.push(chunk)
    size+=chunk.length
})
data.on('end',()=>{
    const buf = Buffer.concat(chunks,size)
    console.log(buf);
    console.log(buf.toString());
})