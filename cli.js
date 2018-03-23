/**
 * 简易脚手架
 */
//原生逐行读取模块
const readline = require('readline')
const chalk = require('chalk')       //彩色输出
const {exec} = require('child_process')  //子进程
const question = '项目名称 : '

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


//问问题
const sayQuestion = (question)=>{
    return new Promise((res,rej)=>{
        rl.question(question, (answer) => {
            res(answer)
            rl.close();
          });
    })
}

const init = async ()=>{
    const name = await sayQuestion(question)
    console.log(chalk.blue('project name:',name));
    console.log(chalk.green('loading....'));
    exec(`mkdir ${name} | cd ${name}`,(error, stdout, stderr)=>{
        if(error){
            console.log(chalk.error('create error:',error))
            process.exit(0)
        }
        
    })
}

init()

