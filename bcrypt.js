//加密密码
const pwd = "ljk1996"
const crypto = require('crypto')

const hash = crypto.createHmac('sha256', pwd)
                   .digest('hex')
console.log(hash);



