/**
 * Created by lijinke on 2016/5/2.
 */
var express = require("./node_modules/express");
var app = express();
//var nodemailer = require("./node_modules/nodemailer");            //邮件模块
var mailer = require("./config/sendEmail.js");
//var mailTransport2= nodemailer.createTransport({
//    host:"smtp.163.com",             //服务器地址
//    secureConnection:true,           //安全连接
//    port:465,
//    auth:{
//        user:"a1231236677287@163.com",            //网易邮箱账号
//        pass:"shouquan1996"                       //这里不是登录密码  而是 安全授权密码
//    }
//});
//mailTransport2.sendMail({
//    from:'李金珂:<a1231236677287@163.com>',           //发件人  必须和auth 认证用户名一致
//    to:'<641529952@qq.com>',      //收件人
//    subject:'通过nodejs  发送邮件测试',          //邮件标题
//    html:'<h1>文本</h1><br/>里面可以嵌入html代码',                           //邮件内容可以嵌入  html代码 图片都可以
//    generateTextFromHtml:true              //将html转换为文本
//},function(err,res){
//    console.log("错误信息："+err);
//    console.log("成功信息："+res);
//});

mailer.sendEmail("1359518268@qq.com","标题","内容");
app.listen(1996,function(){
    console.log("邮件测试");
});


