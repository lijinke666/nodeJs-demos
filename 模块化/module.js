module.exports = {
  test() {
    console.log('test...')
  }
}

// 虽然 exports 是 module.exports 的引用 但是不能共存
// 外面调用这个方法会报错

exports.a = () => {
  console.log('a')
}
