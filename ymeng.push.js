    /**
     * 发送友盟消息推送
     * @param {String} pushSource 推送来源 (iOS | Android)
     * @param {String} type 推送方式 
     * @param {String} deviceTokens  设备号 
     * @param {String} messageTitle   消息标题 
     * @param {String} messageContent  消息内容 
     * 
     */
    sendUmengPushMessage({
        pushSource,
        type = MESSAGE_TYPE.UNICAST,        //默认单个推送
        deviceTokens,
        messageTitle,
        messageContent
    }) {
        let payload = null
        switch (pushSource) {
            //安卓
            case PUSH_SOURCE.ANDROID:
                payload = {
                    body: {
                        ticker: messageTitle,      //通知栏提示文字
                        title: messageTitle,              //通知标题
                        text: messageContent,        //通知文字描述
                        after_open: "go_app"
                    },
                    display_type: DISPLAY_TYPE.NOTIFICATION
                }
                break;
            //ios
            case PUSH_SOURCE.IOS_PUSH:
                payload = {
                    aps: {
                        alert: messageTitle
                    }
                }
            default:
                throw new Error('未知的系统类型')
                break;
        }
        const requestParams = {
            appkey: PUSH_APP_KEY,
            timestamp: Date.now(),
            type,
            device_tokens: deviceTokens,
            payload
        }
        //获取签名
        const sign = helper.getUmengSign({ method: METHOD, requestParams })
        const options = {
            method: METHOD,
            uri: `${SEND_NOTICES_API}?sign=${sign}`,
            body: requestParams,
            json: true
        }
        debug(options)
        HTTP_logger.info(`[Fn => sendUmengPushMessage ] 请求参数 ${JSON.stringify(options)}`)
        return new Promise((res, rej) => {
            request(options).then((data) => {
                debug('success', data)
                HTTP_logger.info(`消息推送成功 ${JSON.stringify(data)}`)
                res(data)
            }).catch((err) => {
                debug('err', err);
                Error_logger.info(`消息推送失败:${JSON.stringify(err)}`)
                rej(err)
                throw new Error(err)
            })
        })

        debug('[Fn => sendUmengPushMessage ] 签名 => ', sign)
    },