/**
 * @name 流的合并
 * @description 合并多个文件 输入成一个文件
 * @description https://cnodejs.org/topic/5b8bb226632c7f422e5b83ca
 */

const fs = require('fs');
const path = require('path');
const { Writable, Readable } = require('stream');

/**
 *
 * @param {*} readStream  可读流
 * @param {*} dest 输入地址
 */
const resolveStream = (readStream, dest) => {
  return new Promise((res, rej) => {
    readStream.on('end', res);
    readStream.on('error', rej);
    readStream.pipe(
      dest,
      { end: false }
    );
  });
};

/**
 *
 * @param {*} streams 可读流
 * @param {*} dest   可写流 将 Streams 的可读流 写到 里面
 * @param {*} callback
 */
const concat = async (streams = [], dest, callback) => {
  //输入目录不是 一个可写流的话  创建一个
  if (!(dest instanceof Writable)) {
    dest = fs.createWriteStream(dest);
  }

  for (let stream of streams) {
    //接受的如果不是一个 可读流的话 创建一个
    if(!(stream instanceof Readable)){
      stream = fs.createReadStream(stream)
    }
    await resolveStream(stream, dest);
  }
  callback && callback()
};

const res = (name)=> path.resolve(__dirname,name)

const src = [
  res('console.js'),
  res('server.js'),
]
const dest = res('test.concat.js')
concat(src, dest ,()=>{
  console.log(' 合并成功 ')
})
