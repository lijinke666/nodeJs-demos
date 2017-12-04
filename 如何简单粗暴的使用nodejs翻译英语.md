## 如何简单粗暴的使用nodejs翻译英语

### 前言
---

工作中会接触到国际化多语言的问题,首先会配置两个中英语的json文件,通过cookie 使用对应的文件,列如
```
// translateEN.js
Translations.TranslateEN = {
    HOME: {
        VIDEO: 'Video',
        DESTINATION_GUIDE: 'Destination Guide',
        FOOD: 'Meals & Drinks',
        FLIGHT_INFO: 'Flight Info',
    }
}

// translateCN.js
Translations.TranslateCN = {
    HOME: {
        VIDEO: '视频',
        DESTINATION_GUIDE: '目的地指南',
        FOOD: '食物和饮料',
        FLIGHT_INFO: '航班信息',
    }
}
```
英语1级的我,通常是用谷歌或有道翻译填进去, 一旦字段很多之后, 简直头皮发麻!
直到有一天我看到同事在用 node 写一个 翻译 backbone 源码 中注释 的功能,简直帅气,同样的,这个场景下同样适用,于是就尝试了一波

### 需要转换的文件
---

现在有一个 `translateEn.js` 的文件, 目标是 转成 `translateZh.js`
```js
Translations.TranslateEN = {
    HOME: {
        VIDEO: 'Video',
        DESTINATION_GUIDE: 'Destination Guide',
        FOOD: 'Meals & Drinks',
        FLIGHT_INFO: 'Flight Info',
        AIRLINE_INFO: 'Airline Info',
        ENTERTAINMENT: 'Entertainment',
        PUBLICATIONS: 'Publications',
        FEATURED_SELECTIONS: 'Featured Selections',
        FEEDBACK: 'Feedback',
        ACTIVITY: 'Events & Promos',
        SHOPPING: 'Duty Free Shopping',
        MUSIC: 'Music',
        FLIGHT_MAP: 'Flight Map',
        SERVICE: 'Service',
        GAME: 'Game',
        INFO: 'News',
        SOCIAL: 'Connect',
        DOWNLOAD: 'App Center',
        PROMPT: 'Prompt',
        ORIENTATION_MSG: 'Please use portrait orientation for mobile web view!'
    }
}
```

### 观察 谷歌 和 有道 翻译的 网页版 
---

经过尝试,返现谷歌和有道 都是通过 `ajax` 请求 进行的翻译,但是谷歌爸爸 对接口进行了 `Token` 限制,所有只有选择 有道
<br/>

<img src="https://lijinke666.github.io/Book/src/images/20171204174707.png" style="max-width:100%"/>
<br/>

知道了它的接口 和请求参数 事情就好办了

### 代码实现
---

首先我们根据有道的接口 写一个 配置, 通过观察, 发现 参数 `i` 即 需要翻译的文字,其他写死即可

```js
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
```

然后我们引入相应模块

```js
const fs = require('fs')
const path = require('path')
const request = require("request")  //发起请求
```

接着 读取 需要翻译的文件
```js
const ENFile = fs.readFileSync(path.resolve(__dirname, "translateEN.js"),'utf8').toString();
```

这里需要注意的是 `fs.readFileSync()` 方法 默认的 `encoding` 是 `null`, 如果是翻译中文文件的
话,就会乱码,所以需要加上 `utf8`

接下来就是请求有道接口了

```js
function requestForYouDao(data) {
  return new Promise((res, rej) => {
    request.post(requestConfig(data), (err, res, body) => {
      if (err) {
        rej(err)
      }
      res(JSON.parse(body)['translateResult'][0][0].tgt)
    })
  })
}
```

这里之所以这样写

```js
res(JSON.parse(body)['translateResult'][0][0].tgt)
```

是因为 有道 接口返回的数据结构 如下图
<br/>

<img src="https://lijinke666.github.io/Book/src/images/20171204180114.png" style="max-width:100%"/>
<br/>

到这里,我们就可以发起请求了 转换翻译后的数据 为一个新json

```js
async function translateMsg(dataArr) {
  const Translations = {}
  let allObj = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    let transText = await requestForYouDao(arr[i]);
    allObj[arr[i]] = transText;
  }
  Translations.TranslateCN.HOME = allObj
  return JSON.stringify(Translations,undefined,2);
}
```

到这里 我们只剩下最后一步,就是 把等到的结果 写入一个新的文件

```js
async function createResultFile(data,filename = "testResult.js"){
    const result = await translateMsg(data)
    const target = path.resolve(__dirname, filename)
    if (fs.existsSync(target)) {
      fs.unlinkSync(target)
    }
    fs.writeFileSync(target, result)
    process.exit(0)
}
```

`createResultFile(data,fielname)` 接收一个文件内容,和一个文件名, 那么文件内容怎么获取呢,直接 将 `ENFile` 传进去,肯定是不行的,所以我们需要将 `ENFile` 里面的 英文单词 匹配出来

```js
const arr = ENFile.match(/(\'|\")(.*)(\'|\")/mgi) || []

(async (data)=>{
  await createResultFile(data)
})(arr)

```

将 "" 或者 '' 里面的东西 匹配出来,当然这样的正则局限性太大,可自行优化一下 :)

```
正则 和 李金珂写的代码,都无比的难以阅读 —— 鲁迅
```

鲁迅真的有说过这句话!

### 运行代码
---

我们将这些代码 保存到 `translate.js` 里面 

```js
node translate
```

稍等片刻,查看生成的 `testResult.js`,内容如下
```js
{
  "'Video'": "'Video'",
  "'Destination Guide'": "“目的地指南”",
  "'Meals & Drinks'": "“食物&饮料”",
  "'Flight Info'": "的航班信息",
  "'Airline Info'": "“公司信息”",
  "'Entertainment'": "“娱乐”",
  "'Publications'": "“出版物”",
  "'Featured Selections'": "“特色选择”",
  "'Feedback'": "“反馈”",
  "'Events & Promos'": "“事件&广告片”",
  "'Duty Free Shopping'": "“免税购物”",
  "'Music'": "'Music'",
  "'Flight Map'": "“飞行地图”",
  "'Service'": "“服务”",
  "'Game'": "'Game'",
  "'News'": "“新闻”",
  "'Connect'": "“连接”",
  "'App Center'": "“应用中心”",
  "'Prompt'": "“提示”",
  "'Please use portrait orientation for mobile web view!'": "“请使用肖像方向移动web视图!”"
}
```

可以看到基本上英语都变成了中文, 另外因为 `JSON.stringify(Translations,undefined,2)` 的原因,所有的 key & value 加上了双引号,可以使用 `replace` 正则替换一下 即可


### 完整代码
---

```js
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


```
### 结语
这样一个简单粗暴的 nodejs 翻译 就完成了, 娱乐尚可, 灵活性,生产环境可用性 几乎为0,不过也是一种有趣的思路 



