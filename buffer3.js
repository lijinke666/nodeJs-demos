const buf = Buffer.alloc(3)
console.log(Buffer.isEncoding('utf-8'));

const buf2 = Buffer.from(buf,'utf-8')
const buf3 = Buffer.from('test')

console.log(buf2,buf3);