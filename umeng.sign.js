const crypto = require('crypto')
//获取友盟 推送签名
    getUmengSign({
        method = METHOD,
        url = SEND_NOTICES_API,
        secret = APP_MASTER_SECRET,
        requestParams = {}
    }) {
        const postBody = JSON.stringify(requestParams)
        debug('[Fn => getUmentSign ] postBody => ', postBody)
        const sign = crypto.createHash('md5')
            .update(method + url + postBody + secret, 'utf8')
            .digest('hex')
        debug('[Fn => getUmentSign ] 签名 => ', sign)
        return sign
    },