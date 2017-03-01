const express = require("express")
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')     //ip地址 和 数据库的名字

const db = mongoose.connection
db.once('open',()=>{
  console.log('mongoose 打开')
  let userSchema = new mongoose.Schema({        //定义数据集合每个字段的类型
    name:{

    }
  },{
    collection:"tGood"              //集合
  })

  let tGood = mongoose.model('tGood',userSchema)

 //find()  相当于mysql select * from table
  find(tGood).then(data=>{
    console.log(data)
  })   
})
db.on('error',()=>{
  console.log('连接失败')
})


app.set('port',process.env.PORT || 6666)

const PORT = app.get("port")

app.listen(PORT,()=>console.log(`server running in ${PORT}`))


const find = ( collection )=>{
  return new Promise((res,rej)=>{
      collection.find({},(err,data)=>{
        if(err) rej(err)
        else res(data)
      })
  })
}