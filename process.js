//process 进程

//获取进程id  windows | android 平台无效
process.getuid && console.log(process.getuid());
process.getgid && console.log(process.getgid());

// //环境信息
// console.log(process.env);

// //捕获进程错误
// process.on("uncaughtException",(err)=>{
//     console.log('error',err);
// })
// test()         //调用不存在的函数 报错 上面会捕获到


// //promise 没有 reject的时候 会触发
// process.on('unhandledRejection',(reason,p)=>{
//     console.log('reject',p,'reason:',reason);
// })

// const test = ()=> new Promise((res,rej)=> rej('test error') )
// test().then(v=> console.log(v))


// //警告事件

// process.on("warning",(warning)=>{
//     console.log(warning);
// })

//当前工作目录
console.log(process.cwd());
console.log(__dirname);


//添加到 消息队列

console.log('1');
process.nextTick(()=>{
    console.log('我被加入了下一个消息队列');
})
console.log(2);