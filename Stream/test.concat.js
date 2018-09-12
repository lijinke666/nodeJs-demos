/**
 * process.stdin (可读流)
 * process.stdout (可写流)
 * process.stderr (可写流)
 */

const fs = require('fs')
const path = require('path')
const util = require('util')

//利用 pipe 管道操作 将 hello.js 的 东西 流向 标准输出流  从而实现打印的功能
//所以由此可以实现一个简单的 console.log
fs
.createReadStream(path.resolve(__dirname,'./hello.js'))
.pipe(process.stdout)

//调用 write 向可写流  里面 加东西
const log  = (...text)=> process.stdout.write(util.format.apply(null,text))

log('\n')
log('test','aaaa')

console.log(util.format('format %s','1'));//http://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/
//https://github.com/substack/stream-handbook

const http = require('http')
const path = require('path')
const fs = require('fs')

//传统的模式  先读取文件放到内存中 然后发给前端  如果文件大  导致等待时间长
const server = http.createServer((req,res)=>{
    const data = fs.readFileSync(path.resolve(__dirname,'./hello.js'))
    res.end(data)
})

server.listen(8080,()=> console.log('server is running....'))



const _server = http.createServer((req,res)=>{
    //创建可读流
    const stream = fs.createReadStream(path.resolve(__dirname,'./hello.js'))
    //将stream 传给 response
    stream.pipe(res)
})

_server.listen(8081,()=> console.log('_server is running....'))

