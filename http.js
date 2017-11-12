const http = require('http')
const net = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('李金珂');
})


net.listen(1996, () => {
    console.log('start...')
})


const requreUrl = "http://www.lijinke.cn/api/article"

const data = []
let size = 0
http.get(requreUrl, (res) => {
    res.on('data', (d) => {
        data.push(d)                      //使用 Buffer 拼接的方式 可以避免乱码的情况
        size += d.length
    })
    res.on('end', () => {
        const alldata = Buffer.concat(data, size)
        console.log(alldata);
        console.log(alldata.toString());
        process.exit(0)           //退出当前进程
    })

})