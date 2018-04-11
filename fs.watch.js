const fs = require('fs')
const path = require('path')

fs.watch(path.resolve(__dirname,"http.js"),(evnetType,filename)=>{
    console.log(filename,evnetType)
})