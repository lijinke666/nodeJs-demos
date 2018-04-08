const jwt = require('jwt-simple')

//中间键
module.exports = (req,res,next) => {
    if(req.originalUrl.includes("/login")) return next()
    const token = req.headers.authorization
    if (token) {
        const decoded = jwt.decode(token,"nodemq")
        // 判断是否token已过期
        if (decoded.exp <= Date.now()) {
            res.status(401)
            next('token已过期,请重新登录')
        } else {
            next()
        }
    }else{
        res.status(401)
        next('无效的token!')
    }
}


//路由部分
const express = require('express')
const VError = require('verror')
const router = express.Router()
const { httpLogger } = require('../helper/logHelper')
const { emitter } = require('../common/emitter')
const { users } = require('../../config')
const jwt = require('jwt-simple')

const expires = Date.now() + 7 * 24 * 60 * 60 * 1000          //有效期 7天

router.get('/login', async (req, res, next) => {
    const {
        id,
        username,
        password
    } = req.query
    try {
        if (!username || !password) throw new VError('用户名 和密码 不能为空!')
        const userInfo = users.find(({ username: user, password: pwd }) => user === username && pwd === password)

        if (userInfo) {
            const token = jwt.encode({
                iss: userInfo.id, // issuer 表明请求的实体
                exp: expires, // expires token的生命周期
                aud: 'test'
            }, "nodemq");
            // emitter.emit('login', userInfo)
            res.resRawData = {
                token
            }
            next()
        } else {
            throw new VError('登录失败,用户名或密码错误!')
        }
    } catch (error) {
        next(error)
    }
})