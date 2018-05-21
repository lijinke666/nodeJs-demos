const express = require("express");
const fs = require("fs");
const app = express();
const { PassThrough, Writable } = require("stream");
const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder("utf8");
const writable = new Writable();
const Form = require('./form')
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
  // console.log(req.headers['content-type'])    // 找到里面的 content-type 字段 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryJnAACRgmszphkaXv'

  //TODO: 继续研究
  const form = new Form()
  form.parse(req,(err,fields)=>{
    console.log('app.js:',fields);
  })

});

app.listen(1996, () => console.log("start..."));
