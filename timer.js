/**
 * @name timer
 * @description nodejs中的定时器
 */

 setTimeout(()=> console.log('setTimeout 1s'),1000)

 setInterval(()=> console.log('setInterval 1s'),1000)

 /**
  * 加到下一个队列
  */
 process.nextTick(()=> console.log('process.nextTikc'))

 setImmediate(()=> console.log('setImmediate 1s'),1000)

 console.log('222');
 