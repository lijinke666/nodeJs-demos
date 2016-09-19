/**
 * Created by lijinke on 2016/5/2.
 */
var nodemailer = require("../node_modules/nodemailer");
module.exports={
    sendEmail:function(touser,title,html){
        if(typeof title=="undefined"){
            title="默认标题"
        }
        if(typeof html=="undefined"){
            html="默认内容"
        }
        var mailTransport= nodemailer.createTransport({
            host:"smtp.163.com",             //服务器地址
            secureConnection:true,           //安全连接
            port:465,
            auth:{
                user:"a1231236677287@163.com",            //网易邮箱账号
                pass:"shouquan1996"                       //这里不是登录密码  而是 安全授权密码
            }
        });
        mailTransport.sendMail({
            from:"a1231236677287@163.com",           //发件人  必须和auth 认证用户名一致
            to:touser,      //收件人
            subject:title,          //邮件标题
            html:html,                           //邮件内容可以嵌入  html代码 图片都可以
            generateTextFromHtml:true              //将html转换为文本
        },function(err){
            if(err==null){
                console.log("发送成功☺");
            }else{
                console.log("错误信息："+err);
            }
        })
    }

}