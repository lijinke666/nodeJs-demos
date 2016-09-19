/**
 * Created by lijinke on 2016/3/30.
 */
var express = require("./node_modules/express");
var cookieParser = require("./node_modules/cookie-parser");
var ejs = require("./node_modules/ejs");
var app = express();
app.use(express.static(__dirname+"/myfile"));
app.use(cookieParser());      //使用cookie中间键
app.engine('html',ejs.__express);//指定文件的后缀名
app.set("views",__dirname+"/myfile/views/");                                  //将ejs默认路径更改为myfile
app.set('view engine','html');
app.get("/",function(req,res){
    var cookie = req.cookies.ljk;
    if(cookie){
        console.log("当前cookie为"+cookie ? cookie :'空');
        res.send("你又来了啊！");
    }else{
        res.cookie("ljk","ljk",{maxAge:60*1000});          //设置cookie名为ljk   有效期一分钟
        res.send("小伙子第一次来啊");
    }
});

app.get("/index",function(req,res){
    console.log(req.cookies.ljk);
    res.render("cookie",{cookie:req.cookies.ljk});
});
var server = app.listen(80,function(){
    console.log("nodeJS是个好东西");
});