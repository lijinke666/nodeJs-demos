/**
 * @name deepRead
 * @desc 获取一个文件夹下面所有的文件名,递归实现
 */

 const path = require('path')
 const fs = require('fs')
 const filePath = path.resolve(__dirname,"./xml2excel")

 const deepRead = (dir=__dirname)=>{
     if(!fs.existsSync(dir)) throw new Error(`${dir}: 不存在`)
     const _dir = fs.readdirSync(dir)     //当前目录列表
     const filenames = []

     for(let item of _dir){
         const _path = path.join(dir,item)
         const isDirectory = fs.lstatSync(_path).isDirectory()
         if(isDirectory){
             filenames.push(...deepRead(_path))
         }else{
             filenames.push(_path)
         }
     }
     return filenames
 }


 const files = deepRead(filePath)

 console.log(files);