var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http)
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
app.use(bodyParser());
app.use(cookie())
app.use(express.static(__dirname+"/myfile"))

let user = [];
let userNum = 0;         //在线人数
let u = undefined;       //当前用户

app.get('/',( req,res,next )=>{
    if(req.cookies.app){
        res.redirect('websocket.html')
    }else{
        res.redirect('login.html')
    }
    next();
})
app.post('/login',( req,res )=>{
    let {username,password} = req.body;
    res.cookie("app",username,{maxAge:1000*60*60*24});  
    u = username;  
    console.log('进来了')
   res.send({success:1})
})
app.get('/user',( req,res,next )=>{
    res.send({
        username:req.cookies.app
    })
})

io.on('connection',( socket )=>{
    console.log('服务端<----->客户端连接成功:)');
    socket.emit('open'); //通知客户端已连接
    socket.on('login',( username )=>{
        //如果当前的userId 没有重复  就向user  添加一条 在线人数+1
        let isRepart = user.map(( v,i )=>{
            return v['username']
        }).indexOf(username['username']);
        if( isRepart === -1 ){
            userNum ++;
            user.push(username);
        }

        //向所有用户 推送当前用户登录信息
        io.emit('login',{username,userNum:userNum})
        console.log('新用户加入=>',username)
    })
    socket.on('message',( messageInfo )=>{
        //向所有用户 推送当前消息
        io.emit('message',Object.assign({ username:u },messageInfo));
        console.log('客户端发来消息=>',messageInfo)
    })
})
http.listen(666,()=>{
    console.log('gogogo~')
})