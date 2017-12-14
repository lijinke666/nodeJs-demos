/**
 * nodejs 提供了一些常用的工具函数
 */
const {
    promisify,
    callbackify,
    deprecate,
    format
} = require('util')
const querystring = require('querystring')           //nodejs 内置 字符串解析 对深度结果不支持

const fs = require("fs")

//将callback风格的函数转为 promise
const readFile = promisify(fs.readFile)

readFile('./buffer.js').then((data)=>{
    // console.log(data+"");
}).catch(e=>console.log(e))

const obj = { id: {a:1}}
console.log(querystring.stringify(obj))

//将promise风格 函数转为 callbcak
// callbackify(readFile)

/**
 * @name deprecate  
 * @desc 讲一个函数标示为废弃的
 */
 const log = deprecate(()=>{           //只会触发一次
     console.log(111);
 },'log 已经废弃!!!!')

 log(11);


 /**
  * @name format
  * @desc 格式化  有点像 模板占位符
  */
  const testFormatText = '你好 %s 我是你 %s'
  console.log(format(testFormatText,'李金珂','爹爹'))     //你好 李金珂 我是你 爹爹
  console.log('尊敬的用户: %s ,你好!,您已欠费 %d','李金珂',100);

