//assert 断言
const assert = require('assert')        //自带的断言库

const test1 = {
    name:"李金珂"
}
const test2 = {
    name:"苍井空"
}
const test3 = {
    name:"李金珂"
}

const test4 = { name:{last:"李"}}
const test5 = { name:{last:"李"}}

//浅比较
assert.equal(1,1)
assert.equal(1,"1")
assert.equal(test1,test2)  //AssertionError
assert.equal(test1,test3)  

//深比较
assert.deepEqual(test4,test5)  