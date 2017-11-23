const Koa = require('koa')
const times = require('koa-response-time')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const PORT  = 1996

//实例
const app = new Koa()
const router = new Router()

const testMiddle = require('./middleware/test')
app.use(times())
app.use(bodyParser())
app.use(testMiddle)
// app.use( ctx =>{
//     ctx.body = "李金珂牛逼!"
// })

router.get('/',async (ctx,next)=>{
    ctx.body = ctx.request.body
})

app.listen(PORT,()=> console.log('start...'))