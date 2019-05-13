const http = require('http')
const { fork } = require('child_process')

http.createServer((req, res) => {
  // fork 一个子进程
  const child = fork(__dirname, [req.url.substring(1)])
  // 监听子进程发送的数据
  child.on('message', (data) => {
    res.end(data)
  })
}).listen(7777)
