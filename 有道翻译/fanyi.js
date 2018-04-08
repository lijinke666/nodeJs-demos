const fs = require('fs')
const path = require('path')
const request = require("request")

const ENFile = fs.readFileSync(path.resolve(__dirname, "translateEN.js")).toString();

const arr = ENFile.match(/(\'|\")(.*)(\'|\")/mgi) || []

const requestConfig = (data) => ({
  url: "http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule&smartresult=ugc&sessionFrom=null",
  form: {
    type: 'AUTO',
    i: data,
    doctype: 'json',
    version: 2.1,
    keyfrom: 'fanyi.web',
    ue: "UTF-8",
    action: "FY_BY_CLICKBUTTON",
    typoResult: false
  }
})

//请求有道翻译接口
function requestForYouDao(data) {
  return new Promise((res, rej) => {
    request.post(requestConfig(data), (err, respo, body) => {
      if (err) {
        rej(err)
      }
      res(JSON.parse(body)['translateResult'][0][0].tgt)
    })
  })
}

//转换翻译后的数据 为一个新json
async function translateMsg(dataArr) {
  let Translations = {
    TranslateCN:{
      HOME:{}
    }
  }
  let allObj = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    let transText = await requestForYouDao(arr[i]);
    allObj[arr[i]] = transText;
  }
  Translations.TranslateCN.HOME = allObj
  return JSON.stringify(Translations,undefined,2);
}


async function createResultFile(data,filename = "testResult.js"){
    const result = await translateMsg(data)
    const target = path.resolve(__dirname, filename)
    if (fs.existsSync(target)) {
      fs.unlinkSync(target)
    }
    fs.writeFileSync(target, result)
    console.log(`trans ${filename} done !`,result)
    process.exit(0)
}


(async (data)=>{
  await createResultFile(data)
})(arr)


