const assert = require('assert')
const {
    extern_address
} = require('../config')

const PORT = 3000
const validator = require('validator')
const rp = require('request-promise')
const SUCCESS_CODE = 0

const fetch = async (api, body) => {
    const res = await rp.post({
        method: 'POST',
        uri: api,
        body,
        json: true // Automatically stringifies the body to JSON})
    })
    console.log(`【api】${api}`,`【result】${JSON.stringify(body)}`);
    return res
}

describe('coin server api tests', () => {
    describe('#/access/login', () => {
        it('登录成功,返回用户信息', async () => {
            const { code } = await fetch(`${extern_address}:${PORT}/access/login`, {
                "username": "1359518268@qq.com",
                "password": "111111"
            })
            assert(code === SUCCESS_CODE)
        })
    })
    describe('#/access/captcha', () => {
        it('获取验证码', async () => {
            const { code,captcha } = await fetch(`${extern_address}:${PORT}/access/captcha`)
            assert(code === SUCCESS_CODE && validator.isBase64(captcha.img) === true)
        })
    })
    describe('#/user/info', () => {
        it('获取验证码', async () => {
            const { code,infos } = await fetch(`${extern_address}:${PORT}/user/info`,{
                uids:[1000]
            })
            assert(code === SUCCESS_CODE)
        })
    })    
})