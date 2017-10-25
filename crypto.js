const crypto = require('crypto')      //内置加密库 可以加密密码  或者算hash md5 之类的

const pwd = '123456'

const hash = crypto.createHmac('sha256', pwd)
.update('test')
.digest('hex')

console.log(hash);        //9d2bb116e1df997ffe8a5139fc1d187f976c19579a138414a112bc2e39020eba

//md5
const md5 = crypto.createHash('md5').update('test').digest("hex") //098f6bcd4621d373cade4e832627b4f6
const md52 = crypto.createHash('md5').update('test22').digest("hex") //4d42bf9c18cb04139f918ff0ae68f8a0
console.log(md52);