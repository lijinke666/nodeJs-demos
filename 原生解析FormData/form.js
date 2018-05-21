/*
 * @Author: Jinke.Li 
 * @Date: 2018-05-09 13:30:15 
 * @Last Modified by: Jinke.Li
 * @Last Modified time: 2018-05-21 18:16:58
 */
const { PassThrough, Writable } = require("stream");
const { StringDecoder } = require("string_decoder");
/*
 * @name 自己撸一个 formData 解析器 
 * @author Jinke.Li
 * @class Form
 * @extends {Writable}
 */
class Form extends Writable {
  constructor(options) {
    super(options);
    this.decoder = new StringDecoder("utf8");
    //捕获 form-data 参数
    this.fieldsReq = /;\s*([^=]+)=(?:"([^"]+)"|([^;]+))/gi;
    // header 里面的 contentType 长这样 : contentType: multipart/form-data; boundary=----WebKitFormBoundary60d84WdI9j6Avg4c
    // 检查是否是 formData 格式
    this.formDataReq = /^multipart\/(?:form-data|related)(?:;|$)/i;
    this.START = 0;

    this.fields = {} //字段
    this.files = {}  //文件
  }
  parse(req,cb) {
    this.on('error',(err)=>{
      console.log('parse error:\n',err);
      cb(err)
    })
    //流 结束之后 emit 一个 filed 事件  这里订阅这个事件
    this.on('field',(name,value)=>{
      console.log('parse field:\n');
      const fieldsArray = this.fields[name] || (this.fields[name] = []);
      fieldsArray.push(value);
      process.nextTick(()=>{
        if(req.readable){
          req.resume()
          req.once('end',()=>{
            cb(null,this.fields)
          })
        }
        cb(null,this.fields)
      })
    })

    this.on('close',()=>{
      console.log('parse close:');
      cb(undefined,this.fields)
    })


    const fieldStream = new PassThrough();
    const contentType = req.headers["content-type"];
    console.log("contentType:", contentType);
  
    let value = "";
    //readable 当有可读流时执行
    fieldStream.on("readable", () => {
      console.log("fieldStream readable start...\n");

      //读取 拿到 buffer
      const buffer = fieldStream.read();
      if (!buffer) return;
      // 拼接 buffer decoder.write 把buffer 转成字符串
      value += this.decoder.write(buffer);
    });
    fieldStream.on("end", () => {
      console.log("fieldStream end:\n");
      // console.log(fieldStream.name); //当前的这个流的名字 ------WebKitFormBoundary9p19uUXH92TOp4wf--

      //接受完成之后 发布 field 自定义事件
      this.emit("field", fieldStream.name, value);
    });
    fieldStream.on("error", err => {
      console.log("fieldStream error:\n", err);
    });

    //监听当前 request 对应事件
    req.on("end", () => {
      console.log("req end:\n");
    });
    req.on("error", err => {
      console.log("req error:\n", err);
    });
    req.on("aborted", () => {
      console.log("req aborted..\n");
    });

    //检测是否设置了编码
    this.checkIsSetEncoding(req);
    //检查是否是formData格式
    this.checkContentType(req);
    //
    const fields = this.getFormDataField(contentType);
    if (!fields) {
      throw new Error("你 TM 这个不是formData!");
    }

    const boundary = this.getBoundary(fields, contentType);

    if (!boundary) {
      throw new Error("没找到 formData 的边界");
    }

    this.setUpParser(boundary);
    //把当前request所有的数据 都 给当前的可读流 也就是加入管道, 如果不写这句  上面的事件无法触发
    req.pipe(fieldStream);
  }
  //检查  二进制流 是否设置了编码  如果设置了 数据可能损坏
  /**
   * @param {Object} req
   */
  checkIsSetEncoding({ _readableState, _decoder } = {}) {
    const { encoding, decoder } = _readableState || {};
    if (_decoder || encoding || decoder) {
      throw new Error("大兄弟,不要设置编码,数据可能会损坏");
    }
  }
  checkContentType(req) {
    const contentType = req.headers["content-type"];
    if (!contentType) {
      throw new Error("content-type 不能为空!");
    }
  }
  getFormDataField(contentType) {
    //以multipart 开头 后面紧跟 form-data 或者 related 然后后面紧跟 ; 哇 正则真牛批
    return this.formDataReq.exec(contentType);
  }
  getBoundary(fields, contentType) {
    let boundary;
    //设置正则表达式开始下一次查找的索引位置
    this.fieldsReq.lastIndex = fields.index + fields[0].length - 1;
    while ((fields = this.fieldsReq.exec(contentType))) {
      if (fields[1].toLowerCase() !== "boundary") continue;
      boundary = fields[2] || fields[3];
      break;
    }
    return boundary;
  }
  setUpParser(boundary) {
    this.boundary = Buffer.alloc(boundary.length + 4);
    this.boundary.write("\r\n--", 0, boundary.length + 4, "ascii");
    this.boundary.write(boundary, 4, boundary.length, "ascii");
    this.lookbehind = Buffer.alloc(this.boundary.length + 8);
    this.state = this.START;
    this.boundaryChars = {};
    for (var i = 0; i < this.boundary.length; i++) {
      this.boundaryChars[this.boundary[i]] = true;
    }

    this.index = null;
    this.partBoundaryFlag = false;
  }
  /**
   *
   * @name 继承 Writable 可写流 需要提供一个 _write 将数据发送到底层资源
   * @param {any} chunk
   * @param {any} encoding
   * @param {any} callback
   * @memberof Form
   */
  _write(chunk, encoding, callback) {
    console.log("_write......");
    console.log(chunk);
    callback();
  }
}

module.exports = Form;
