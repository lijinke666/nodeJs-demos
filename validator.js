/**
 * 以前还自己写这个
 * 结果发现了这个好东西
 */
const validator = require("validator")

console.log(validator.isEmail('123@qq.com'))          //true
console.log(validator.isBoolean("true"))            //true
console.log(validator.isIP('192.168.2.154'))           //true

const testJSON = {
    a:1,
    name:{
        id:2
    }
}

console.log(validator.isJSON(JSON.stringify(testJSON)))        //true
console.log(validator.isURL('http://www.baidu.com'))         //true
console.log(validator.isMongoId("591911ad74c59cde06c280fb"))   //true  这个还可以
console.log(validator.isMongoId("123"))   //false