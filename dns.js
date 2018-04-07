//域名服务器
const dns = require('dns')

const url = "www.lijinke.cn"

//ip地址
dns.lookup(url,(err,address,family)=>{
    if(err) throw new Error(err)
    console.log(err,address,family)
})

//解析域名
dns.lookupService("47.94.21.132", 22, (err, hostname, service) => {
  console.log(hostname, service);
});