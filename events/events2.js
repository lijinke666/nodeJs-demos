const EventEmitter = require('events')  

let emitter = new EventEmitter();

//eventEmitter 是同步的

emitter.on('myEvent', () => {
  console.log('hi 1');
});

emitter.on('myEvent', () => {
  console.log('hi 2');
});

emitter.emit('myEvent');     //hi 1 hi 2  两个都会打印