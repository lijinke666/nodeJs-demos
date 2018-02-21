/**
 * @name vm模块
 * 虚拟机学习
 * v8 虚拟机 来运行和编译代码
 */

const vm = require('vm')

const sandbox = {
    age:18
}

const jsCode = `
    age+=2
`

//创建一个上下文 沙盒, 此时 沙盒中有一个全局变量 age=18
vm.createContext(sandbox)

//运行 沙盒变量+2 所以等于20
vm.runInContext(jsCode,sandbox)

//通过虚拟机编译得到结果
console.log(sandbox);  //age 20


/**
 * new vm.Script(code,options)
 */

const code = `
    p = Promise.resolve(1)
`
const script = new vm.Script(code)

const _sandbox = {p:1}

const _contxt = vm.createContext(_sandbox)
script.runInContext(_contxt)

console.log(_sandbox); //{ p: Promise { 1 } }
