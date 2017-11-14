//域名服务器
const dns = require('dns')

dns.lookup('www.lijinke.cn',(err,address,family)=>{
    if(err) throw new Error(err)
    console.log(err,address,family)
})