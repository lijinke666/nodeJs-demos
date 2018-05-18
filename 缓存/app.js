const express = require('express')

const app = express()
const router = express.Router()

app.use(express.static("./public",{
  setHeaders(res){
    res.setHeader('Cache-Control','public,max-age=60')       //cache-control http1.1 的字段 指定缓存有效期= 1分钟
    //1分钟过后 浏览器会发一个请求 判断是否有更改资源 如果没有就返回 304 状态码 
  }
}))

const PORT = 8080
app.listen(PORT,()=>{
  console.log('start....');
})