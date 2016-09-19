/**
 * Created by lijinke on 2016/4/5.
 */
var mysql = require("../config/mysql.js");
exports.angularTest=function(req,res){
    var sql = "select * from user";
    mysql.getMysql(sql,[],function(err,data){
        if(data.length>=1){
            res.send(data);
        }else{
            console.log("sql语句执行失败");
        }
    })
};

exports.updateNickname=function(req,res){
    var nickname = req.body.nickname;
    var phone = req.body.phone;
    var sql = "update user set nickname=? where phone=?";
    mysql.getMysql(sql,[nickname,phone],function(err,data){
        if(!err){
            res.send(nickname);
        }
    })
}
