/**
 * 统一处理 response 格式
 * api  使用 res.resRawData = xxx; next()  发送到前端
 */
const { HTTP_logger } = require('../../libs/logHelper')

module.exports = function (req, res, next) {
    if (!res.resRawData) return next()
    let resRawData = {
        api: req.originalUrl,           //请求接口
        code: 200,
        message: "success",
        method: req.method,
        data: {
            code: "0",
            data: res.resRawData,
            total: res.total || 0
        }
    }
    if (res.resRawData && res.resRawData instanceof Array && res.resRawData.length >= 1) {
        resRawData.total = res.resRawData.length
    }
    HTTP_logger.info('apiHandler:', JSON.stringify({
        query: req.query,
        body: req.body,
        resRawData
    }))

    res.status(200).send(resRawData)
}