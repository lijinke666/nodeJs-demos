const apn = require('apn')  
  
  /**
     * 苹果 apns 推送
     * @param {Array} deviceTokens  目标用户设备号
     * @param {String} messageTitle  推送标题
     * @param {String} messageContent  推送内容
     * @param {Number} badge  未读消息 (小红点)
     * 
     */
function sendAppleApnsMessage({
        deviceTokens = [],
        messageTitle,
        messageContent,
        badge = 1
    }) {
        const prefix = '[Fn => sendAppleApnsMessage ] :'
        if (deviceTokens.length < 1) throw new Error('设备号不能为空!')
        debug(`${prefix} 目标设备号`, deviceTokens)
        const providerOptions = {
            cert: certPath,
            key: keyPath,
            geteway: ISDEV ? DEV_GATE_WAY : PROD_GAGE_WAY,
            passphrase: ISDEV ? DEV_PASSWORD : PROD_PASSWORD, //pem证书密码 
            production: ISDEV ? false : true
        }
        const service = new apn.Provider(providerOptions)
        const note = new apn.Notification()
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // 有效期  一小时.
        note.badge = Number(badge) || 0
        note.sound = "default"
        note.alert = `${messageTitle}: ${messageContent}`
        note.payload = { 'messageFrom': "legendpoker" }
        note.topic = BUNDLE_ID;

        debug(`${prefix} 发送信息`, providerOptions)

        return new Promise((res, rej) => {
            service.send(note, deviceTokens).then((result) => {
                const _result = JSON.stringify(result)
                debug('推送结果', _result)
                const LOG_INFO = {
                    func: prefix,
                    badge,
                    messageTitle,
                    messageContent,
                    providerOptions,
                    tokens: deviceTokens,
                    result: _result
                }
                if (result && result.sent.length >= 1) {
                    debug('发送成功', LOG_INFO)
                    HTTP_logger.info('sendAppleApnsMessage-success', { info: "推送成功!" }, { LOG_INFO })
                    res(_result)
                }

                if (result && result.failed.length >= 1) {
                    debug('发送失败', LOG_INFO)
                    Error_logger.info('sendAppleApnsMessage-error',{ info: "推送失败!" }, { LOG_INFO })
                    rej(_result)
                    throw new Error(_result)
                }
            })
            service.shutdown()
        })
    }