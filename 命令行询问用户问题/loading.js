const readline = require('readline')

const limit = 20   // 模拟提取时长

const formatMoney = (money) => money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const getBalance = () => formatMoney(`1${'0'.repeat(10)}`)
const printProgress = (index) => {
  const offset = limit / 100
  const progress = `${index / offset}%`
  readline.cursorTo(process.stdout, 0,0)
  readline.clearScreenDown(process.stdout)   // 清除标准输出
  const loadBar = new Array(index).fill('=').join('')
  const unloadBar = new Array(limit - index).fill('-').join('')
  process.stdout.write(`提取中 : ${progress} ${loadBar}${unloadBar}`);
}

const print = (money, index) => {
  printProgress(index)
  if(index === limit){
    process.stdout.write(`\n √ 本次提款: ${formatMoney(money)} 元, 账户余额: ${getBalance()} \n`);
    process.exit(0)
  }
}

const getMoney = (answer) => {
  let index = 0
  setInterval(() => {
    ++index
    print(answer, index)
  },200)
}

const rl = readline.createInterface({
  input: process.stdin,       //标准输入流
  output: process.stdout,     //标准输出流
})

rl.question('[成都银行欢迎您] 请输入要提取的金额 : \r', getMoney)
