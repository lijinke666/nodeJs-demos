/**
 * @name writeStream 可写流
 */

const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname,'./hello.js')
const content = "const a = 1"

//writeFile 的模式
fs.writeFileSync(file,content,'utf8')


// //使用可读流

const res = fs.createWriteStream(file,{encoding:'utf8'})

res.write(content)