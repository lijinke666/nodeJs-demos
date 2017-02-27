const fs = require('fs')
const path = require('path')
const request = require('request')
const cheerio = require("cheerio")

const targetDir = path.resolve(__dirname,'images')
const targetUrl = JSON.parse(process.env.npm_config_argv).remain[0];
fs.mkdirSync(targetDir)


request.get(targetUrl,(err,res,body)=>{
  if(!err && res.statusCode === 200 ){     //200 请求成功
      let $ = cheerio.load(body)
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
    request(url).pipe(fs.createWriteStream(path.resolve(__dirname,`images/${filename}.${url.replace(/^http[s]?:\/\/.*\.((jpe?g|png|gif|svg))/ig,"$1")}`)))
  })
}