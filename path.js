const path = require('path')
const fs = require('fs')
const assert = require("assert")

const f = fs.readFileSync(path.resolve(__dirname,'./pageres.js'))
console.log(f.toString());

//path.basename() 方法返回一个 path 的最后一部分
console.log(path.basename('d:/test'));      // /test

//path.extname() 方法返回 path 的扩展名
console.log(path.dirname('d:/test/tes1/d.js'));  //d.js

//path.format() 从一个对象 返回一个路径字符串

const format = path.format({
    root:"/etc",
    dir:"/test/ljk",
    base:"test.js"
})

console.log(format);    // /test/ljk\test.js

//path.parse()  解析字符串 为 对象

console.log(path.parse(format));     
/**
 * { root: '/',
  dir: '/test/ljk',
  base: 'test.js',
  ext: '.js',
  name: 'test' }
 */

//linux windows  路径符会有差异 这个可以统一
console.log(path.resolve(format));    //d:\test\ljk\test.js

//path.isAbsolute() 方法会判定 path 是否为一个绝对路径。
console.log(path.isAbsolute('/a/b'));       //true
console.log(path.isAbsolute('a.js'));       //false
console.log(path.isAbsolute('.'));          //false


//path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
console.log(path.join('/test','a.js'));        //\test\a.js

//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
console.log(path.resolve('./test.js'));          //d:\webStudy\NodeJs-Study\test.js

//path.sep 提供了平台特定的路径片段分隔符：

console.log(path.sep);

//path.relative() 方法返回从 from 到 to 的相对路径（基于当前工作目录）。
console.log(path.relative('./xml2excel/app.js','./apns.js'));     //  ..\..\apns.js

//path.extname()  解析后缀名  以前都是用正则去匹配
const testName = "/test.jpg"
const type = testName.replace(/.*(\..*)$/,'$1')
console.log(type);    //.jpg

const type2 = path.extname(testName)
console.log(type2);     //.jpg

assert.equal(type,type2)