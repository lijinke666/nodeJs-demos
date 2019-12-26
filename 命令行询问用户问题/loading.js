const readline = require('readline')

const limit = 20   //模拟提取时长

const rl = readline.createInterface({
  input: process.stdin,       //标准输入流
  output: process.stdout,     //标准输出流
})

rl.prompt()

rl.question('[成都银行] 你要提取多少钱 : \r', getMoney)


const getMoney = (answer) => {
  let index = 0
  setInterval(()=> {
    if(index === limit){
      console.log(`\n 本次提款 ${answer},请下次再来`);
      process.exit(0)
    }
    readline.cursorTo(process.stdout, 0,0)
    readline.clearScreenDown(process.stdout)   // 清除标准输出
    const loadBar = new Array(index).fill('=').join('')
    const unloadBar = new Array(limit - index).fill('-').join('')
    process.stdout.write(`提取中 : ${loadBar}${unloadBar}`);
    index ++
  },200)
}
