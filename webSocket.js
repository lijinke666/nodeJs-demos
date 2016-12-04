var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http)
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(express.static(__dirname+"/myfile"))

app.get('/',( req,res,next )=>{
    res.redirect('webSocket.html')
    next();
})
app.post('/message.do',( req,res,next )=>{
    let {message} =  req.body;
    console.log(message);
    res.send('1')
})
let user = {};
let userNum = 0;         //在线人数
io.on('connection',( socket )=>{
    console.log('连接成功=》》》》》》》》。');
    socket.emit('open'); //通知客户端已连接
    socket.on('login',( data )=>{
        //如果当前的userId 没有重复  就向user  添加一条 在线人数+1
        if( !user.hasOwnProperty(data.userId) ){
            user[data.userId] = data.username;
            userNum ++;
        }
        //向所有用户 推送当前用户登录信息
        io.emit('login',{username:data.username,userNum:userNum})
        console.log('新用户加入:',data.username)
    })
    socket.on('message',( data )=>{
        //向所有用户 推送当前消息
        io.emit('message',data);
        console.log('客户端发来消息',data)
    })
})
http.listen(666,()=>{
    console.log('gogogo~')
})