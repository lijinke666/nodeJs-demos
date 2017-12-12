import { setImmediate } from "core-js/library/web/timers";

/**
  * 异步api
    使用观察者模式 将异步的回调放入队列中
    在下一轮 tick 时  取出执行
 */

console.log('我最先执行')

 //1. setTimout
 setTimeout(() => {
     console.log('setTimeout')
 }, 0);

let timer = null
//  2. setInterval
timer = setInterval(()=>{
     console.log('setInterval')
     clearInterval(timer)
 },0)


 //3.process.nextTick()  将函数放入队列 下次执行

 process.nextTick(()=>{
     console.log('nextTick')
 })

 //4.setImmediate  与 process.nextTick() 类似  比 proces.nextTick() 出现的晚  nextTick 要优先于 它


 setImmediate(()=>{
     console.log("setImmediate");
 })