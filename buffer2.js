

const {StringDecoder} = require("string_decoder")
const decoder = new StringDecoder('utf8')
const buf = Buffer.allocUnsafe(51)

buf.writeInt16BE(0,2)
buf.writeInt32BE(0,4)
console.log(decoder.write(buf));

/**
 * 尝试buffer的拼接
 */

const buf1 = Buffer.allocUnsafe(4)
const buf2 = Buffer.allocUnsafe(4)

const totalLength = buf1.length + buf2.length
console.log(totalLength);

buf1.writeInt32BE(0x0102,0)
buf2.writeInt32BE(0x0304,0)

const uidBuffer = Buffer.concat([buf1,buf2],totalLength)

console.log('uidBuffer',decoder.write(uidBuffer));