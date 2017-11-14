//字符串解码器  把buffer解析成字符串

const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const cent = Buffer.from([0xC2, 0xA2]);
console.log(cent);
console.log(cent.toString());             //¢        toString 默认是 utf8 编码
console.log(decoder.write(cent));         //¢