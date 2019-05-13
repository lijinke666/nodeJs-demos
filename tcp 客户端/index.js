/**
 * 测试
 * node index.js towel.blinkenlights.nl 23
 */

const net = require('net')
const host = process.argv[2]
const port = Number(process.argv[3])

const socket = net.connect(port, host)

socket.on('connect',()=>{
  console.log('connect success....');

  // 将标准输入流 加入 socket 管道
  process.stdin.pipe(socket)

  // 将当前 socket 加入 标准输出流 的管道
  socket.pipe(process.stdout)

  // 开始读取数据
  process.stdin.resume()
})

// 当当前 tcp 连接 结束后 停止接收数据
socket.on('end',()=> {
  console.log('end....')
  process.stdin.pause()
})
