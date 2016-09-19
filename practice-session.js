/**
 * Created by lijinke on 2016/3/30.
 */
var express  = require("./node_modules/express");
var app = express();
var session = require("./node_modules/express-session");
var bodyParser = require("./node_modules/body-parser");
var cookieParser = require("./node_modules/cookie-parser");
var ejs = require("./node_modules/ejs");
var mysql = require("./config/mysql.js");
app.use(express.static(__dirname+"/myfile"));      //设置myfile为根目录
app.use(bodyParser()) ;                  //Parser中间键
app.use(express.favicon(__dirname+"/myfile/images/milk.jpg"));         //设置title图片
app.engine('html',ejs.__express);                  //将ejs后缀名设置为html
app.set("view engine","html");                      //设置模板引擎为ejs

app.use(session({
    secret:"ljkSession",           //session名称
    cookie:{maxAge:1000*60*30},       //过期时间1分钟
    resave:true,                   //session没有被修改  也保存
    savaUninitialized:true         //初始化变量
}));
app.use(app.router);
app.get("/",function(req,res){                //登录首页判断有无session
    var session = req.session.ljkSession;
    var defualt = "今天第一次来吧！赶紧登录";
    console.log("session为"+session);
    if(session){
        res.render("index",{session:session});          //如果有session跳转
    }else{
        res.render("login",{defualt:defualt});       //否则跳转到登录界面
    }
});
app.post("/index.do",function(req,res){
    var username = req.body.user;
    var password = req.body.password;
    console.log("用户名"+username);
    console.log("密码"+password);
    var sql="select * from user where phone=? and pwd=?";
   mysql.getMysql(sql,[username,password],function(err,data){
       if(!err && data.length>=1){
           var obj={
               username:username,
               password:password,
               nickname:data[0].nickname
           };
           req.session.ljkSession=obj;
           res.render("index",{session:obj})
       }else{
           res.send("账号不存在");
       }
   })
});
app.get("/out",function(req,res){
    req.session.destroy();             //注销session
    res.redirect("/");                 //返回根目录
})
app.listen(1996,function(){
    console.log("狗带");
});