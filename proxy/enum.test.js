/**
 * @name enum.js 
 * 枚举代理
 */

const {_enum} = require('./enum')

const types = {
    "ADD":"add",
    "DELETE":"delete"
}

const enumTypes = _enum(types)

enumTypes['TEST']      //会报错

Reflect.set(types,'TEST','test')

