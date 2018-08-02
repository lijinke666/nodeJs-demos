/**
 * @name readStream 可读流
 */

 const fs = require('fs')
 const path = require('path')

const file = path.resolve(__dirname,'./hello.js')
//readFile 的模式
 fs.readFile(file,(err,data)=>{
     if(err) throw err
     console.log(data+"");
 })


 //使用可读流

 const res = fs.createReadStream(file,{encoding:'utf8'})

 res.on('data', data =>{
     console.log(data);
 })