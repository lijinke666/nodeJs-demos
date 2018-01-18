//子进程
const {exec,spawn} = require("child_process")
// exec('ls',(err,stdout,stderr)=>{
//     if(err) throw err
//     console.log(stdout);
//     console.log(stderr);
// })

//nodejs 实现守护进程
//node test.process.js
const p = spawn('node',['test.process.js'],{
    detached:true           //如果true  则调用 setsid 方法    准备将子进程独立于父进程运行
})

console.log(process.pid,p.pid);
// process.exit(0)