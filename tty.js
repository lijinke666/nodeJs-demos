/**
 * tty 文本终端
 */

const tty = require('tty')

console.log(process.stdout.isTTY);   //tty

process.stdout.on('resize',()=>{
    console.log(`
        [列]:${process.stdout.columns}
        [行]:${process.stdout.rows}
    `);
})