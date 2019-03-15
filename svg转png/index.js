const fs = require('fs')
const path = require('path')
const svg2png = require('svg2png')


const svg = fs.readFileSync(path.resolve(__dirname,'../文字转 svg/test.svg'))
svg2png(svg, { filename: path.resolve(__dirname,'./test.png') }).then((data)=>{
  // fs.writeFile(path.resolve(__dirname,'./test.png'), data)
}).catch(error=> console.log(error))
