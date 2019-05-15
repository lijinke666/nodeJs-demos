var buf = Buffer.from(0);

var i = 0xCDEF; // 52719 in decimal

buf.writeUInt32BE(i >> 8, 0); //write the high order bits (shifted over)
buf.writeUInt32BE(i & 0x00ff, 4); //write the low order bits

console.log(buf); //displays: <Buffer 00 00 00 cd 00 00 00 ef>

var bufInt = (buf.readUInt32BE(0) << 8) + buf.readUInt32BE(4);
console.log(bufInt); //displays: 52719
