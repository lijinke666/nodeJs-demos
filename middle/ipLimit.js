const { getClientIp } = require('../helper/ipHelper')
const { isIP } = require('validator')
const { API_AUTH_IP_CONFIG } = require('../config')
const debug = require('debug')("ipLimit")
const { HTTP_logger,Error_logger } = require('./logHelper')

const API_AUTH_IP_CONFIG = {
    "WX":["11.22.33.44"],            //微信
    "GM":["1.2.3.4",'444.33.22.11'],   //管理后台
}

module.exports = (req, res, next) => {
    const clientIp = getClientIp(req)
    //ip有效性验证
    if (isIP(clientIp)) {
        const apiAuthIps = Object.values(API_AUTH_IP_CONFIG).reduce((prev, next) => prev.concat(next))
        debug('clientIp',clientIp)
        //ip验证
        const isPass = apiAuthIps.some((ip) => ip.includes(clientIp) || clientIp.includes(ip))
        if (!isPass){
            Error_logger.info('ipLimit-error:',{
                api:req.originalUrl,
                ip:clientIp,
                apiAuthIps:apiAuthIps,
                isPass:isPass
            })
            return next(`[ipLimit error]: ${clientIp} has not visited the jurisdiction!`)
        }else{
            HTTP_logger.info('ipLimit-success:',{
                api:req.originalUrl,
                ip:clientIp,
                apiAuthIps:apiAuthIps,
                isPass:isPass
            })
            next()
        }
    } else {
        const errorTip = `[ipLimit error]: ${clientIp} is not a ip!`
        debug(errorTip)
        Error_logger.info('ipLimit-not-is-ip:',{
            api:req.originalUrl,
            ip:clientIp,
            msg:errorTip
        })
        next(errorTip)
    }
}