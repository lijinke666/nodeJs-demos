const {URL} = require('url')

const testUrl = new URL('http://www.baidu.com:8080/login/#test')
//url.hash

console.log(testUrl.hash);     //#test

//url.host
console.log(testUrl.host);     //www.baidu.com

//url.href
console.log(testUrl.href); //http://www.baidu.com/#test

//url.origin
console.log(testUrl.origin);   //http://www.baidu.com

//url.pathname
console.log(testUrl.pathname);     //port

//url.port

console.log(testUrl.port)          //8080

//url.protoco 协议
console.log(testUrl.protocol);       //http: