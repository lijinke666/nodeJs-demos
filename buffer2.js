

const { StringDecoder } = require("string_decoder")
const Int64 = require('node-int64')
const decoder = new StringDecoder('utf8')
const os = require('os')

const x = new Int64(0x123456789)
const y = new Int64('123456789abcdef0')
// const buf = Buffer.allocUnsafe(51)

const createBuffer = (size) => (fnName) => (content, offset = 0) => {
    const BYTE = "BE"
    const _Buffer = Buffer.allocUnsafe(size).fill(0)
    _Buffer[fnName](content, offset)
    return _Buffer
}
// buf.writeInt16BE(0,2)
// buf.writeInt32BE(0,4)
// consoRE.log(decoder.write(buf));

const create64Buffer = (size = 8) => (value) => {
    const nullBuffer = Buffer.alloc(8)
    const int64 = new Int64(value)
    const buffer_64 = int64.toBuffer()
    buffer_64.copy(nullBuffer, 0)
    return nullBuffer
}
// var buf4 = new Buffer(8) // 8字节的空buffer
// var x = new Int64(1056) // 64进制的1057
// var buffer_64 = x.toBuffer() // 取到64进制的1057的buffer
// buffer_64.copy(buf4, 0) // 将64进制的值赋值给buf4


/**
 * 消息头部结构
    4: 总长度
    23: 客户端头
    28: 通用消息头
    4: 消息长度
 *
 * @param {Options}
 * @param {Number} options.uid 用户id
 * @param {Number} options.msgId 消息id
 * @return HEADERS
 */

function buildHeaders({ uid, msgId = 30000 } = options) {
    const version = createBuffer(2)("writeInt16BE")(0)          //版本号
    const sessionId = createBuffer(4)('writeInt32BE')(0)        //会话id
    const tagId = createBuffer(4)('writeInt32BE')(0)            //包序号
    const _uid = create64Buffer(8)(uid)                      //uid             
    const bodyFlag = createBuffer(1)("writeIntBE")(0)           //bodyFlag
    const optionLength = createBuffer(4)("writeInt32BE")(0)     //options length
    const timestamp = create64Buffer(8)(0x11223344)             //时间戳
    const magicNum = createBuffer(2)("writeInt16BE")(0)               //magic num
    const _msgId = createBuffer(2)("writeInt16BE")(msgId)               //消息id
    const msgType = createBuffer(2)("writeInt16BE")(0)                 //消息类型
    const msgSeq = createBuffer(4)("writeInt32BE")(0)                   //消息序列
    const srcFE = createBuffer(1)("writeIntBE")(0)
    const destFE = createBuffer(1)("writeIntBE")(0)
    const srcId = createBuffer(4)("writeInt32BE")(0)
    const destId = createBuffer(4)("writeInt32BE")(0)

    const config = [
        { value: version, length: version.length },
        { value: sessionId, length: sessionId.length },
        { value: tagId, length: tagId.length },
        { value: _uid, length: _uid.length },
        { value: bodyFlag, length: bodyFlag.length },
        { value: optionLength, length: optionLength.length },
        { value: timestamp, length: timestamp.length },
        { value: magicNum, length: magicNum.length },
        { value: _msgId, length: _msgId.length },
        { value: msgType, length: msgType.length },
        { value: msgSeq, length: msgSeq.length },
        { value: srcFE, length: srcFE.length },
        { value: destFE, length: destFE.length },
        { value: srcId, length: srcId.length },
        { value: destId, length: destId.length }
    ]

    const totalLength = config.reduce((prev, { length }) => prev += length, 0)
    const _buffers_ = config.map(({ value }) => value)

    const headers = Buffer.concat(_buffers_, totalLength)

    return headers
}

const HEADERS = buildHeaders({uid:0x11223344,msgId:30000})

console.log(HEADERS);



