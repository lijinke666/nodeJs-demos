const express = require('express')
const app = express()
const mcache = require('memory-cache')

//https://juejin.im/post/59afbf056fb9a02480711697

app.get('/',({originalUrl,url},res,next)=>{
    const key = `__express__${originalUrl || url}`
    const cacheBody = mcache.get('key')
    if(cacheBody){
        res.send(cacheBody)
    }else{
        // res.sendRes = res.send
        // res.send = (body)=>{
            mcache.put('key','hello',5000)
            res.send('hello')
        // }
        // next()
    }  
})
app.listen(8175,()=>console.log('start....'))