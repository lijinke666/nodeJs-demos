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

console.log(util.format('format %s','1'));