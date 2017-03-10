const fs = require('fs')
const path = require('path')
const request = require("request")

const ENFile = fs.readFileSync(path.resolve(__dirname,"translateEN.js")).toString();

const arr = ENFile.match(/(\'|\")(.*)(\'|\")/mgi) || []

const requestConfig = ( data )=> ({
  url: "http://fanyi.youdao.com/translate?smartresult=dict&smartresult=rule&smartresult=ugc&sessionFrom=null",
  form: {
    type: 'AUTO',
    i: data,
    doctype: 'json',
    smlVersion:1.8,
    keyfrom: 'fanyi.web',
    ue: "UTF-8",
    action: "FY_BY_CLICKBUTTON",
    typoRESULT: true
  }
})

//请求有道翻译接口
function requestYouDao( data ){
  return new Promise(( res,rej )=>{
    request.post(requestConfig(data), (err, respo, body) => {
      if (err) {
        rej(err)
      }
      res(JSON.parse(body)['translateResult'][0][0].tgt)
    })
  })
}

//转换翻译后的数据 为一个新json
async function translateMsg(dataArr){
  let allObj = {};
  for(var i =0,len = arr.length; i<len; i++){
     let transText = await requestYouDao(arr[i]);
     allObj[arr[i]] = transText;
  }
  return JSON.stringify(allObj);
}

translateMsg(arr).then( data => {
  const target = path.resolve(__dirname,'test.js')
  if(fs.existsSync(target)){
    fs.unlinkSync(target)
  }
  fs.writeFileSync(target,data) 
}).catch(err=>console.log(`[error]:${err}`))


