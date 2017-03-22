const express = require("express")
const app = express();

app.set('port', process.env.PORT || 6666)
app.post('/music', (req, res) => {
  res.send([
    {
      "id": 1,
      "name": "董小姐",
      "category": [
        "民谣"
      ],
      "fans": 19304459
    },
    {
      "id": 2,
      "name": "杀死那个石家庄人",
      "category": [
        "民谣"
      ],
      "fans": 13264874
    },
    {
      "id": 3,
      "name": "一起摇摆",
      "category": [
        "摇滚",
        "流行"
      ],
      "fans": 66848752
    }
  ])
})

const PORT = app.get('port')

app.listen(PORT, () => console.log(`express listing ${PORT}`))