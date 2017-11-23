//测试一下和 express 的 中间键有啥子区别
module.exports = async (ctx,next) =>{
    console.log('我是中间键')
    next()
}