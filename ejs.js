/**
 * Created by lijinke on 2016/4/11.
 */
var express= require("./node_modules/express");
var ejs = require("./node_modules/ejs");
var ejsMate = require("./node_modules/ejs-mate");            //ejs母版
var mysql = require("./config/mysql.js");
var body = require("./node_modules/body-parser");
var app=express();
app.use(express.static(__dirname+"./myfile"));
app.engine('html',ejs.__express);//指定文件的后缀名
app.set("views",__dirname+"/Myfile/views/");                                  //将ejs默认路径更改为myfile
app.set('view engine','html');
app.engine('html', ejsMate);
app.locals._layoutFile = 'layout.html';          //模板页       如果不加这句话  则在每个页面  <% layout('layout.html') -%>
app.get("/",function(req,res){
    var sql = "select * from movie";
    mysql.getMysql(sql,[],function(err,data){
        if(data.length>=1){
            res.render("index",{active:"index",title:"电影首页", data:data})
        }
    })
});
app.get("/login",function(req,res){
    var id = req.query.id;
    console.log(id);
    var sql = "select * from movieinfo where i_m_id=?";
    mysql.getMysql(sql,[id],function(err,data){
        if(data.length>=1){
            res.render("login",{active:"login",title:"电影详情",info:data});
        }
    })
});
app.get("/usercenter",function(req,res){
    var id = req.query.id;
    console.log(id);
    var sql= "select * from user where phone=?";
    mysql.getMysql(sql,[id],function(err,data){
        if(data.length>=1){
            console.log(data);
            res.render("usercenter",{title:"个人中心",data:data})
        }else{
            console.log(err);
        }
    })

});
app.get("/select",function(req,res){
    var sex = req.query.sex;
    console.log(sex);
    var sql ="select * from user where sex=?";
    switch (sex){
        case "0":
            sex="男";
            break;
        case "1":
            sex="女";
            break;
        case "2":
            sql="select * from user";
            break
    }
    mysql.getMysql(sql,[sex],function(err,data){
        res.render("index",{title:"查询完成",data:data})
    })

})
app.listen(666,function(){
    console.log("ejs 母板");
});
