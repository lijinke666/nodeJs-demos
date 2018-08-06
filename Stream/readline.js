const readline = require('readline')
const fs = require('fs')
const path = require('path')
//readline 本质是 对 stream 可读流 (Readble) 的一种封装


const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(__dirname,'./hello.js'))
})

rl.on('line',(line)=>{
  console.log('test:',line);
})