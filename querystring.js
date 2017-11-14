/**
 * nodejs 原生提供的 字符串解码 工具
 */

const querystring = require('querystring')

const testStr = 'foo=bar&abc=xyz&abc=123'

const testObj = {
    name:1,
    age:18,
    sex:['男','女']
}

const parse = querystring.parse(testStr)
console.log(parse);

/**
 * {
    foo: 'bar',
    abc: ['xyz', '123']
    }
 */

const string = querystring.stringify(testObj)

console.log(string);
//name=1&age=18&sex=%E7%94%B7&sex=%E5%A5%B3