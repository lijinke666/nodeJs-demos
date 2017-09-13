/**
 * buffer好难懂啊。。。
 */
//废弃的写法
// const buf = new Buffer(3)

// console.log(buf);

//新写法
const buf2 = Buffer.from('试试')
console.log(buf2);

buf2.write("哈哈",3,3)

console.log(buf2.toString());

const buf3 = Buffer.allocUnsafe(4)

buf3.writeUInt32BE(0xfeedface,0)


console.log(buf3);
console.log(buf3.toString());

const buf4 =Buffer.allocUnsafe(4)
buf4.writeUInt32LE(0xfeedface, 0);
console.log(buf4);
console.log(buf4.toString());