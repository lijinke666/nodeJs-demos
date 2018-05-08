const express = require("express");
const fs = require("fs");
const app = express();
const { PassThrough, Writable } = require('stream');
const {StringDecoder} = require('string_decoder');
const decoder = new StringDecoder('utf8')
/**
 * 四种基本的流类型
 * Readable - 可读的流 (例如 fs.createReadStream()).
  Writable - 可写的流 (例如 fs.createWriteStream()).
  Duplex - 可读写的流 (例如 net.Socket).
  Transform - 在读写过程中可以修改和变换数据的 Duplex 流 (例如 zlib.createDeflate()).
 */

app.use(express.static(__dirname + "/public/"));

app.post("/upload", (req, res, next) => {
  /**
   * 前端传过来 这样的 文件流
   * ------WebKitFormBoundary9mjuftX1wqDfKEPD
    Content-Disposition: form-data; name="file"; filename="21015895.jpg"
    Content-Type: image/jpeg
    ------WebKitFormBoundary9mjuftX1wqDfKEPD--
   */
  // console.log(req.headers.content-type)    // 找到里面的 content-type 字段 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryJnAACRgmszphkaXv'
  const fieldStream = new PassThrough();
  let value = ""
  //readable 当有可读流时执行
  fieldStream.on('readable', ()=> {
    //读取 拿到 buffer
    const buffer = fieldStream.read();
    if (!buffer) return;
    // 拼接 buffer decoder.write 把buffer 转成字符串
    value += decoder.write(buffer);
  });
  fieldStream.on('end', function() {
    console.log(fieldStream.name,value)
  });
  fieldStream.on('error', function() {
    console.log('出错了')
  });
  //TODO: 继续研究
});

app.listen(1996, () => console.log("start..."));
