const fs = require('fs')
const path = require('path')
const request = require('request')
const cheerio = require("cheerio")            //服务端的jquery

const targetDir = path.resolve(__dirname,'images')
let targetUrl = ""
try{
   targetUrl = JSON.parse(process.env.npm_config_argv).remain[0]
}catch(e){
  targetUrl = "http://www.lijinke.cn";
}

fs.mkdirSync(targetDir)

request.get(targetUrl,(err,res,body)=>{
  if(!err && res.statusCode === 200 ){     //请求 目标地址 请求成功
      let $ = cheerio.load(body)           //转换成jquery模式
      $('img').each(function(i,v){
        const src = $(this).attr('src')
        console.log(`${i}.[抓取到的图片]:${src}`)
        downloadImg(src,Date.now())
        console.log(`${i}.[${src}]:[下载完成]`)
      })
  }
})

const downloadImg = (url,filename)=>{
  request.head(url,(err,res,body)=>{
    //会有 //www.baidu.com/xx.jpg  和 http://www.baidu.com/xx.jpg 这种情况
    request(url).pipe(fs.createWriteStream(path.resolve(__dirname,`images/${filename}.${path.extname(url)}`)))
  })
}