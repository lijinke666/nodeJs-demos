/**
 * Created by lijinke on 2016/3/30.
 */
var express = require("./node_modules/express");
var session = require("./node_modules/express-session");
var app = express();
app.use(session({       //使用session中间键
    secret:  "ljk session",         //session 名
    cookie:{ maxAge:1000*60*3}      //多久过期
}))
app.get("/",function(req,res){
    var session = req.session.sign;
    if(session){
        console.log("session为"+session ? session :'空');
    }else{
        req.session.sign=true;
        req.session.name="李金珂";
        res.send("欢迎登录");
    }
})
app.listen(80,function(){
    console.log("go~");
});