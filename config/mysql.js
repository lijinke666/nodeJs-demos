/**
 * Created by lijinke on 2016/4/1.
 */
var thismysql = require("../node_modules/mysql");
module.exports={
    db:{
        host:"localhost",
        user:"root",
        password:"1996",
        database:"ljk",
        dataString:true
    },
    getMysql:function(sql,array,callback){
        var pool= thismysql.createPool(this.db);
        pool.getConnection(function(err,conn){
            if(!err){
                conn.query(sql,array,callback);
                conn.release();
            }else{
                console.log("!===数据库连接失败=====!");
                console.log(err);
            }
        })
    }
};