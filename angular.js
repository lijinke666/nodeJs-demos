/**
 * Created by lijinke on 2016/4/5.
 */
var express= require("./node_modules/express");
var bodyParser = require("./node_modules/body-parser")
var cookie = require("./node_modules/cookie-parser");
var session = require("./node_modules/express-session");
var include= require("./dao/dao.js");
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname+"/myfile"));
app.use(session({
    secret:"ljkSession",           //session名称
    cookie:{maxAge:1000*60*30},       //过期时间1分钟
    resave:true,                   //session没有被修改  也保存
    savaUninitialized:true         //初始化变量
}));
app.get("/",function(req,res){
	res.redirect("angular.html");
});

/*查询用户表*/
app.post("/angularTest.do",include.angularTest);
/*修改用户名*/
app.post("/updateNickname.do",include.updateNickname);
app.listen(666,function(){
    console.log("angular!");
});