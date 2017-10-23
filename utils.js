/**
 * nodejs 提供了一些常用的工具函数
 */
const {promisify} = require('util')
const querystring = require('querystring')           //nodejs 内置 字符串解析 对深度结果不支持

const fs = require("fs")

//将callback风格的函数转为 promise
const readFile = promisify(fs.readFile)

readFile('./buffer.js').then((data)=>{
    console.log(data+"");
}).catch(e=>console.log(e))

const obj = { id: {a:1}}
console.log(querystring.stringify(obj))
