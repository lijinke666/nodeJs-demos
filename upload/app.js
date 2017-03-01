const express = require('express')
const app = express()
const multiparty = require('multiparty')
const fs = require('fs');

app.use(express.static(__dirname+"/public"))

app.get('/',(req,res)=>{
  console.log('come')
})

app.post('/upload',(req,res)=>{
   const form = new multiparty.Form();
   form.parse(req,( err,fields,files )=>{
     const {fieldName,originalFilename,path,size} = files[Object.keys(files)[0]][0]
     const file = fs.readFileSync(path).toString()       //异步读取文件 2进制格式  toString转换

     const src = __dirname + "/file/" + originalFilename
     fs.writeFileSync(src,file,'binary')
     res.send({success:1})
   })
})

app.set('port', process.env.PORT || 8070 )
app.listen(app.get('port'),()=>{
  console.log('express listen ',app.get('port'));
})
