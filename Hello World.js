/**
 * Created by lijinke on 2016/3/15.
 */
var express = require("./node_modules/express");
var app = express();
app.use(express.static(__dirname+"/myfile"));
app.get("/",function(req,res){
    res.redirect("/login.html");
});
app.get("/test.htm",function(req,res){
    res.send("6666");
})

var server = app.listen(80,function(){
    var address = server.address().address;
    var port = server.address().port;
    console.log("正在监听端口"," 地址"+address+"  端口号"+address,port);
})