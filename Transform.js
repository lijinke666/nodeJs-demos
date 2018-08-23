/**
 * @name Transform
 * @description 可读可写流
 */

const { 
  Transform 
} = require('stream');

class MyTransform extends Transform {
  //因为 Transform 继承自 Duplex 所以不用实现 _read 和 _write
  _transform(data, decode, next) {
    console.log('data:',data.toString());
    process.nextTick(next)
  }
}

const myMyTransform = new MyTransform('hello,world');

myMyTransform.write('hello')
myMyTransform.write('world')
myMyTransform.end()

myMyTransform.on('data',(data)=>{
  console.log('data:',data.toString());
})
