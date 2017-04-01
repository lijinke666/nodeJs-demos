const express = require("express")
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser())
app.set('port', process.env.PORT || 8000)
//跨域请求
app.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();
})
const data = [
  {
    "id": 1,
    "name": "董小姐",
    "category": [
      "民谣"
    ],
    "fans": 19304459,
    "info": `《董小姐》创作灵感来源于宋冬野身边一名姓董的摄影师朋友的情感故事[3]  。
那时董老师爱上一个人，宋冬野在听了董老师的情感经历后，内心有感而发，把她的情感故事做了一个总结[4]  ，于是创作出了这首歌词和旋律都很简单让人容易记住的歌曲`
  },
  {
    "id": 2,
    "name": "杀死那个石家庄人",
    "category": [
      "民谣"
    ],
    "fans": 13264874,
    "info": `《杀死那个石家庄人》，万能青年旅店创作并于2010年演唱的歌曲，收录在专辑《万能青年旅店》中。[1]  这首歌实际上描述了北方重工业城市在经历过了时代变迁，从计划经济到市场经济的的变轨所经历的阵痛，和那些被遗忘或者是被抛弃的群体的失落和愤怒的感受。资源丰富和经济繁荣的城市已经荣光不再，而沿海的贸易投机者们取代了踏实的劳动者成为了时代的新宠儿。`
  },
  {
    "id": 3,
    "name": "一起摇摆",
    "category": [
      "摇滚",
      "流行"
    ],
    "fans": 66848752,
    "info": `《一起摇摆》是2013年发行的一首激情澎湃，极具节奏感的摇滚歌曲，由汪峰作词并作曲，收录于专辑《生来彷徨》中。`
  }
]
app.post('/music', (req, res) => {
  res.send(data)
})

app.post("/musicDetail",(req,res)=>{
  let d = ""
  req.on('data',(data)=>{
    d+=data
  })
  req.on('end',()=>{
    const {id} = JSON.parse(d)
    for(let v of data){
      if(v.id == id){
        res.send({info:v['info']});
        break;
      }
    }
    // res.send('11')
  })
})
const PORT = app.get('port')

app.listen(PORT, () => console.log(`express listing ${PORT}`))