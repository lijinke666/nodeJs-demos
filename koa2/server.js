const Koa = require('koa')
const app = new Koa()
const PORT  = 1996

const testMiddle = require('./middleware/test')

app.use(testMiddle())
app.use( ctx =>{
    ctx.body = "李金珂牛逼!"
})

app.listen(PORT,()=> console.log('start...'))