import { global } from 'core-js/library/web/timers';



/**
 * @name eventsFile
 * 发布一个 文件操作的 事件
 */

const events = require('events')
const fs = require('fs')
const path = require('path')

class File extends events {}

const EventSFile = new File()

//注册一个 write 时间  像 eventsFile.txt 写当前时间
EventSFile.on('write',()=>{
    const p = path.resolve(__dirname,"./eventsFile.txt")
    const buf = Buffer.alloc(10)
    buf.write('李金珂')
    const data= fs.readFileSync(p)
    const newData = Buffer.concat([data,buf],data.length+buf.length)
    fs.writeFileSync(p,newData)
    console.log('success-----');
})

global.EventSFile = EventSFile
module.exports = EventSFile