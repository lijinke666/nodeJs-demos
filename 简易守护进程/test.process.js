const fs = require('fs')
fs.open('./test.process.txt','w',(err,fd)=>{
    console.log(fd);
    fs.write(fd,process.pid)
})