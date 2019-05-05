const co = require('./index')

const fn = ()=> new Promise((res)=>{
  setTimeout(()=>{
    res('end...')
  },3000)
})

co(function *(){
  const value = yield fn()
  console.log(value)
})
