/*
 * @Author: Jinke.Li
 * @Date: 2019-05-13 10:49:13
 * @Last Modified by: Jinke.Li
 * @Last Modified time: 2019-05-13 10:51:55
 */

// 同步错误 能正常捕获

try {
  throw new Error('错误1')
} catch (error) {
  console.log('error1:', error);
}

// 异步错误 不能正常捕获

const fn = () => {
  setTimeout(() => {
    throw new Error('我是没有捕获的一个错误')
  }, 100);
}

// 执行函数时 没有捕获错误
fn()


// 如果程序中有漏掉的未捕获的错误

process.on('uncaughtException',(error)=>{
  console.log('uncaughtException:', error);  // uncaughtException: Error: 我是没有捕获的一个错误
  process.exit(1)
})



