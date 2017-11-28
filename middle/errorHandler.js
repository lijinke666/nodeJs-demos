const { Error_logger } = require('./logHelper')

module.exports = function (err, req, res, next) {
    const resultData = {
        api: req.originalUrl,
        method: req.method,
        message: "ERROR",
        result: {
            code: 500,
            message: err && err.message ? err.message : err
        }
    }
    Error_logger.info('errorHandler:', JSON.stringify({
        query: req.query,
        body: req.body,
        filename: __filename,
        dirname: __dirname,
        cwd: process.cwd(),
        functionName: require.main.filename,
        resultData
    }))

    res.status(err.status || 500).send(resultData)
}