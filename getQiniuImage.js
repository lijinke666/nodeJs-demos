/**
 * @name 拉取七牛上的图片
 */
const path = require('path')
const request = require('request')
const fs = require('fs')
const host = "https://cdn.legendpoker.cn/"
const downloadDir = path.resolve(__dirname,'qiniuImages')

const isExists = fs.existsSync(downloadDir)
if(isExists){
    fs.rmdirSync(downloadDir)
}else{
    fs.mkdirSync(downloadDir)
}

// //使用  $('.edit-word').text() 拿到所有图片的 text
const testStr = `
    "dev-manager/071f83e83a96f06211573ffc9b911289image/pngdev-manager/0ca7c341a34db56e634d7002c680e5efimage/jpegdev-manager/0fb9dd0f96b3e3a9872d25c56db52d32image/jpegdev-manager/15f58e7835386316943046d26678dc00image/jpegdev-manager/28ec7448e255619c7897469fba54879fimage/pngdev-manager/90d63a4e4610874023c2d65aa3bdcb2fimage/pngdev-manager/d6d711751d535ad094686d3581673e92image/pngdev-manager/mtt/f70d88f6ab16f6005b5e4c5aa05a7d7eimage/pngdev-manager/prize/7c9438f4253aeef1bd2e259ea5e111a8image/jpegdev-manager/prize/87722fe4c4e81a039225704b4720b18bimage/pngdev-manager/prize/aa097d2377cdf1c8c15d7d4121c6afcbimage/pngdev-manager/sng/5de1f1c0bce047e5546896a2043f6a37image/pngdev-manager/taskPrize/1238fa6037585a6ccaf787be975f14f8image/pngmanager/0212110940e78cde9f6d518f2681843eimage/jpegmanager/12e5d6c641efd98de44b02b6c139e835image/jpegmanager/33ba5164d3f5b7801e92ce2e0575034cimage/jpegmanager/3e44500b2aa8e3951a08710cec509892image/pngmanager/4203f7f4d543062b4d8f5476fca4034bimage/pngmanager/5126163ca678b498d57729aebfc4dd38image/jpegmanager/51990b0702bae3b74c8ca3f8166fd38aimage/jpegmanager/5a8c640419115be6f61fd7c229b74d56image/jpegmanager/6718d8c279e2838023caf6f3626503c3image/jpegmanager/748be725e8a030df3ee43770dd06b0efimage/jpegmanager/80b5b31d5c9ed0579fcb93147c0a7c90image/pngmanager/84fb6fb119df2bd633b63500337f20fdimage/jpegmanager/8d671f44b630c22224a2a765adfa9b70image/jpegmanager/8ecc3293598ff75d56033d6c50d4263fimage/pngmanager/act/fl1.pngimage/pngmanager/act/fl2.pngimage/pngmanager/act/fl3.pngimage/pngmanager/act/lxwm1.pngimage/pngmanager/act/lxwm2.pngimage/pngmanager/act/lxwm3.pngimage/pngmanager/act/phb1.pngimage/pngmanager/act/phb2.pngimage/pngmanager/act/phb3.pngimage/pngmanager/act/xlc1.pngimage/pngmanager/act/xlc2.pngimage/pngmanager/act/xlc3.pngimage/pngmanager/act/yqhy1.pngimage/pngmanager/act/yqhy2.pngimage/pngmanager/act/yqhy3.pngimage/pngmanager/c269467f94a5ce52115bc2ef179a2786image/jpegmanager/ce778676eff4bd1876a9b4695c6869eeimage/jpegmanager/cea2d29063be783a7caa992fedfbdf68image/jpegmanager/d2e274f99dc68320dcef5afb00e8ce21image/jpegmanager/d6ab729fadac1017023973b9d1dfe95dimage/jpegmanager/d965fbce039ff8552bfbd5468661f428image/jpegmanager/de8386aab7da5f0bbbb137bdc8997d43image/jpegmanager/e386bd2e9323b53d261c4edbf285de3dimage/jpegmanager/f7fc4271152a82f4e2c78c9127684b23image/jpegmanager/f8fbe56de14f162cab0542bd71c95831image/jpegmanager/fe8888767329232083193bdad119d1e6image/pngmanager/prize/f4bd23a01809adb047e6b959781a53b1image/jpego1.mp4video/mp4"
`

const result = testStr.match(/(manager\/[a-zA-Z0-9]*)image[s]?\/(jpeg|jpg|png)/ig) || []

/**
 * 所有图片数据
 * @return 后缀,地址,名字
 */
const imageData = result.map((path)=>{
    const ext = path.replace(/.*image\/((jpeg|png|jpg))/,'$1')
    let name = ""
    const url =  path.replace(/(.*)(image\/)((jpeg|png|jpg))/,(a,content,c)=>{
        name = content.replace(/manager\/(.*)/,'$1')
        return `${host}${content}.${ext}`
    })

    return {
        ext,
        url,
        name
    }
})


const getImg = (url,filename)=>{
    request.head(url,(err,res,body)=>{
    const target = path.resolve(__dirname,`${downloadDir}/${filename}`)
      request(url).pipe(fs.createWriteStream(target))
      console.log(`${url} 下载成功!`)
    })
}

const startDownload = (imageData)=> {
    imageData.forEach(({ext,url,name},i)=>{
        getImg(url,`${name}.${ext}`)
    })
}


startDownload(imageData)


