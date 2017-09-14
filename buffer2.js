

const {StringDecoder} = require("string_decoder")
const Int64 = require('node-int64')
const decoder = new StringDecoder('utf8')
const os = require('os')

const x = new Int64(0x123456789)
const y = new Int64('123456789abcdef0')
// const buf = Buffer.allocUnsafe(51)
console.log('字节顺序',os.endianness());

const createBuffer = (size)=> (fnName)=> (content,offset)=>{
    const BYTE = (os.endianness() || "LE").toLocaleUpperCase()
    const _Buffer =  Buffer.allocUnsafe(size)
    return _Buffer[fnName+BYTE](content,offset)
}

// buf.writeInt16BE(0,2)
// buf.writeInt32BE(0,4)
// console.log(decoder.write(buf));

/**
 * 尝试buffer的拼接
 */

 const test = createBuffer(2)('writeInt16')(0,0)
 console.log(test);

const buf1 = Buffer.allocUnsafe(2).writeInt16LE(0)
const buf2 = Buffer.allocUnsafe(4).writeInt32LE(0)
const buf3 = Buffer.allocUnsafe(4).writeInt32LE(0)
const buf4 = new Int64(Buffer.allocUnsafe(8).writeInt32LE(0x11223344))
const buf5 = Buffer.allocUnsafe(1).writeIntLE(0)
const buf6 = Buffer.allocUnsafe(4).writeInt32LE(0)
const buf7 = Buffer.allocUnsafe(8).writeInt32LE(0)
const buf8 = Buffer.allocUnsafe(2).writeInt16LE(0)
const buf9 = new Int64(Buffer.allocUnsafe(2).writeInt16LE(30000))
const buf10 = Buffer.allocUnsafe(2).writeInt16LE(0)
const buf11 = Buffer.allocUnsafe(4).writeInt32LE(0)
const buf12 = Buffer.allocUnsafe(1).writeIntLE(0)
const buf13 = Buffer.allocUnsafe(1).writeIntLE(0)
const buf14 = Buffer.allocUnsafe(4).writeInt32LE(0)
const buf15 = Buffer.allocUnsafe(4).writeInt32LE(0)


const aa = Buffer.allocUnsafe(4)
const bufInt = (aa.readInt32BE(0) << 8) + aa.readUInt32BE(4)
console.log(bufInt);

// const totalLength = buf1.length + buf2.length
// console.log(totalLength);

// buf1.writeInt32BE(0x0102,0)
// buf2.writeInt32BE(0x0304,0)

// const uidBuffer = Buffer.concat([buf1,buf2],totalLength)

// console.log('uidBuffer',decoder.write(uidBuffer));




// const x = new Int64(0x123456789)
// const y = new Int64('123456789abcdef0')

// console.log(x,y);



