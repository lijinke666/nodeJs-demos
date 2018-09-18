/**
 * @name Readable
 * @description 可读流
 */


const {
  Readable
} = require('stream')

//继承 可读流
class MyReadable extends Readable {
  constructor(data){
    super()
    this.data = data
    this.index = 0
  }

  //重写基类方法 往流写入数据
  _read(){
    if(this.index === this.data.length){
      //push(null) 表示数据流枯竭,已经没有新的数据了, 必须调用
      this.push(null)
    }else{
      this.push(this.data[this.index])
      this.index ++
    }
  }
}

const data = new Array(100).fill().map((_,i)=> String(i))
const myReadable = new MyReadable(data)

myReadable.on('data',(data)=>{
  console.log('data:',data.toString());   //buffer
})

myReadable.on('end',()=>{
  console.log('end');
})

myReadable.on('error',err => {
  console.log("error:",err);
})