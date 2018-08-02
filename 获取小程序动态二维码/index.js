const rp = require('request')
const { promisify } = require('util')
const request = promisify(rp)

const fs = require('fs')
const path = require('path')

module.exports = async (appid,secret)=>{
  request({
    uri: `https://api.weixin.qq.com/cgi-bin/token`,
    qs: {
      appid,
      secret,
      grant_type: "client_credential"
    },
    json: true
  })
    .then(({access_token}) => {
      rp({
        method:"POST",
        url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`,
        body: JSON.stringify({
          path:sharePath,
          width:86,
          is_hyaline:true
        })
      },()=>{
        res.resRawData = true
        next()
      })
      .pipe(fs.createWriteStream(path.join(__dirname,`code.png`)))
    })
}
