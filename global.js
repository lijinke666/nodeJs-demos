//brower 端 全局 是window
//nodejs 是 global

const name = '李金珂'

const sayName = ()=> console.log(name);

global.name = name
global.sayName = sayName