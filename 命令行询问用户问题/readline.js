//逐行读取
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '你好,骚猪,你是谁?'
});

rl.prompt()

// rl.question('李金珂帅吗?', (answer) => {
//   switch (answer) {
//     case '帅':
//       console.log('有眼光');
//       break;
//     default:
//       console.log('真诚实');
//       break;
//   }

//   rl.close();
// });
const fatherName = "李金珂"
const nextStepName = "我爹"
//监听用户的输入
rl.on('line',async (input)=>{
  const name = input.trim()
  console.log(`你叫:${name} ? 很骚的名字!`);
  console.log('你:MDZZ');
  const who = await question("谁给你取的名字?")
  if(who === nextStepName){
    const father = await question("你爹叫什么名字?")
    if(father === fatherName) {
      console.log(`你爹${fatherName}很欣慰`)
      rl.close()
    }
  }else{
    console.log(`心态崩了,你爹${fatherName}给你取的名字啊,溜了溜了`);
    rl.close()
  }
}).on('close',()=>{
  process.exit(0)
})

const question = async (question = "谁给你取的名字?")=>  {
  return await rl.question(question)
}

//向控制台写入一条
// rl.write('test')