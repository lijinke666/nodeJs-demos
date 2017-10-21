//console.log 正常情况是异步的
const util = require('util')

//源码实现

// Console.prototype.log = function(...args){
//     this._stdout.write(`${util.format.apply(null,args)}`)
// }


//自己实现

const _log = (...strs)=> process.stdout.write(`${util.format.apply(null,strs) + '\n'}`)

_log('你好',2,3,4,5,6)