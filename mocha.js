// 单元测试练习
// 这里没有用chai 断言库 不好用

const assert = require('assert')

describe('Array',()=>{
    let arr
    beforeEach(()=>{
        arr = [3,2,1,10]
    })
    describe('#sort()',()=>{
        it('需要按重小到大排序',()=>{
            const test = [1,2,3,10]
            assert(arr.sort((a,b)=>a+b) === test)
        })
    })
})