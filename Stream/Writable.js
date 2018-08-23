/**
 * @name Writable
 * @description 可写流
 */


const {
  Writable
} = require('stream')

class MyWritable extends Writable {
  //重写 write 方法 将流中的数据 传入底层
  _write(data, encode, next){
    //写入 标准输出流
    process.stdout.write(data.toString())
    // 调用 next() 表示 继续下一个 write
    process.nextTick(next)
  }
}

const myWritable = new MyWritable()

//写入数据
myWritable.write('hello \n')
myWritable.write('world \n')      //如果 _write 方法 未调用  next() 'world' 写不进去

//表示无数据写入
myWritable.end()   

//结束之后  触发 finish 事件
myWritable.on('finish',()=>{
  console.log('finish!');
})