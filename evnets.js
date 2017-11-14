//事件订阅 与 发布
const events = require('events')

//nodejs 通常都是事件驱动 evnets 可以以观察者模式进行 骚操作

class MyEmitter extends events {

}

const Emitter = new MyEmitter()

Emitter.on('hello',()=>{
    console.log('你好');
})

Emitter.emit('hello')

Emitter.once('once',()=>{
    console.log('只触发一次');
})

const timer = setInterval(()=>{
    Emitter.emit('once')
},300)

setTimeout(()=>{
    clearInterval(timer)
    process.exit(0)
},2000)


//为当前进程绑定错误事件
process.on('uncaughtException', (err) => {
    console.error('有错误');
});


Emitter.on('error',(err)=>{
    console.log(err);
})
Emitter.emit('error',new Error('错误了'))


//浏览器 或 nodejs  事件驱动 
/**
 * 如
 * document.querySelector('div').on('click',()=>{
 *  
 * })
 * 这里注册了一个点击事件 可以看成是 浏览器预先发布了(emit) 几个事件
 * 
 * xx.emit('click')
 * 我们才可以做对应的事情
 * 同理也可以自定义事件 
 * */
