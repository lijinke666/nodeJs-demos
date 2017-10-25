//逐行读取
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('李金珂帅吗?', (answer) => {
  // 对答案进行处理
  console.log(`谢谢:${answer},你说的对!`);

  rl.close();
});