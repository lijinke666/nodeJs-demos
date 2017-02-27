//网页截图
const path = require("path")
const Pageres = require("pageres")
const page = new Pageres({delay:2})
                .src('zhihu.com',['1024x768','480x320','iphone 5s'],{crop:true})
                .dest(path.resolve(__dirname,'images'))
                .run()
                .then(()=> console.log('网页截图完成'))