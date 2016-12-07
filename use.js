var express = require('express');
var app = express();
var router = express.Router();
//中间键
router.use(( req,res,next )=>{
	console.log('路由都要走我这里过哈哈');
	next();
})
router.get('/',( req,res,next )=>{
	res.send('6666')
})
router.get('/home',( req,res )=>{
	res.send('<h1>哈哈哈哈哈</h1>')
})
app.use('/',router)
app.listen( process.env.PORT || 8080,()=>{
  	console.log('===== 哈哈 ======');
});
