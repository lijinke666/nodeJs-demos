/**
 * 简易脚手架
 */
//原生逐行读取模块
const readline = require('readline')
const chalk = require('chalk')       //彩色输出
const { execSync } = require('child_process')  //子进程
const fs = require('fs')
const path = require('path')
const question = '项目名称 : '

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//问问题
const sayQuestion = (question) => {
    return new Promise((res, rej) => {
        rl.question(question, (answer) => {
            res(answer)
            rl.close();
        });
    })
}

const createFiles = (name) => {
    execSync(`mkdir ${name} | cd ${name}`)
    const _pkg = JSON.stringify({
        version:"0.0.1",
        name,
        author:"Jinke.Li"
    },undefined,2)
    fs.writeFileSync(path.resolve(__dirname,name,"package.json"), _pkg)
    console.log(chalk.green('√ create success!'));
    process.exit(0)
}

const init = async () => {
    try {
        const name = await sayQuestion(question)
        console.log(chalk.blue('project name:', name));
        console.log(chalk.green('loading....'));
        createFiles(name)
    } catch (e) {
        console.log(chalk.red('create faild:',e.message));
        process.exit(0)
    }


}

init()

