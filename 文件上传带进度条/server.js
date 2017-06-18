const express = require('express')
const fs = require('fs')
const app = express()
const multiparty = require('multiparty')

app.use(express.static(__dirname+"/public/"))

app.post('/uploadFile',(req,res,next)=>{
    const form = new multiparty.Form();
     form.parse(req, (err, fields, files) => {
         files.file.forEach((item,i)=>{
             let {path} = item
             const f = fs.readFileSync(path)

             fs.writeFileSync(`${__dirname}/public/image/test.jpg`,f,'binary')
         })
     })

})

app.listen(1996,()=>console.log('开始'))