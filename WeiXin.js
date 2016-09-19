/**
 * Created by lijinke on 2016/3/31.
 */
var express = require("./node_modules/express");
var app=express();
var ejs = require("./node_modules/ejs");
var mysql = require("./config/mysql.js");
var jssha = require("./node_modules/jssha");         //加密模块
app.use(express.static(__dirname+"/myfile"));      //设置myfile为根目录
app.use(express.bodyParser()) ;                  //Parser中间键
app.use(express.methodOverride());
app.use(express.favicon(__dirname+"/myfile/images/milk.jpg"));         //设置title图片
app.engine('html',ejs.__express);                  //将ejs后缀名设置为html
app.set("view engine","html");                      //设置模板引擎为ejs
/*==============================================================================*/

app.get("/",function(req,res){
    var sql ="select * from user";
    mysql.getMysql(sql,[],function(err,data){
        if(!err && data.length>=1){
            console.log("sql执行成功");
            res.render("WeiXin",{issuccess:data})
        }
    })
});
app.get("/interface",function(req,res){
    var token = "weixin";           //与公众平台 token(令牌)一致
    var signature = req.query.signature;      //加密签名
    var timestamp = req.query.timestamp;      //时间戳
    var echostr = req.query.echostr;          //随机字符串
    var nonce = req.query.nonce;              //随机数
    var Array =[];
    Array[0]=token;                //将token，时间戳，随机数添加到数组排序生成字符串
    Array[1]=timestamp;
    Array[2]=nonce;
    Array.sort();
    var str = Array.join("");
    var obj = new jsSHA(str,"TXET");                   //加密
    var scyptoString= obj.getHash("SHA-1","HEX");      //签名字符串

    if(signature==scyptoString){              //如果微信服务端的签名  和 请求的签名字符串一样
        //验证成功
    }else {
        //验证失败
    }
});
app.post("/interface",function(req,res){

})
app.listen(1996,function(){
    console.log("微信接口练习");
});