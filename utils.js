/**
 * nodejs 提供了一些常用的工具函数
 */
const {promisify} = require('util')
const fs = require("fs")

//将callback风格的函数转为 promise
const readFile = promisify(fs.readFile)

readFile('./buffer.js').then((data)=>{
    console.log(data+"");
}).catch(e=>console.log(e))
