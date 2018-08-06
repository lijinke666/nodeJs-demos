//zlib 文件压缩

const fs = require('fs');
const zlib = require('zlib');
const path = require('path')

fs.createReadStream(path.resolve(__dirname,'./buffer 和 Stream 的区别.md'))
  .pipe(zlib.createGzip())                      //将文件 流向  压缩包
  .on('data', () => process.stdout.write('.'))
  .pipe(fs.createWriteStream(path.resolve(__dirname,'./test.zip')))  //创建一个可写流 把数据流向 压缩包里
  .on('finish', () => console.log('Done'));