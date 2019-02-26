const express = require('express');
const router = express.Router();
const errs = require('../config/errors.js')
const fs = require('fs')
const { T_user, T_store } = require('../managers/model')
const { 
    tempAvatarDir, 
    avatarSize,
    getUploadKey,
    uploadUrl,
    AccessKey,
    SecretKey,
    bucketName,
    cdnHost
} = require('../config/upload.config')
const sizeOf = require('image-size')
const request = require('superagent')
const qiniuToken = require('qiniu-uptoken')
const validator = require('validator')
const { httpLogger, errorLogger } = require('../common/helper/logHelper')

const TOKEN = qiniuToken(AccessKey,SecretKey,bucketName)

const uploadUri = "https://up-z2.qiniup.com"

/**
 * 头像上传
 * @param {String} avatar 头像 [base64]
 * @return {msg:url}
 */
router.post('/avatar', (req, res, next) => {
    existsSync(tempAvatarDir)
    let { avatar="" } = req.body
    try {
        let base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
    
        if(!avatar || !validator.isBase64(base64Data)) return next(JSON.stringify(errs.not_avatar))
        const key = getUploadKey()
        const type = avatar.match(/^data:image\/(\w*)/)[1] || "png";        //拿到当前是什么图片 jpeg/png

        let imageData = Buffer.from(base64Data, 'base64');         //使用 Buffer转换成二进制

        const filename = `${tempAvatarDir}/${Date.now()}.${type}`
        fs.writeFileSync(filename,imageData,'binary')
        const avatarSize = sizeOf(filename)

        httpLogger.info("/avatar-tempAvatar-save-success:",avatarSize)
        //长宽限制200
        if (avatarSize.width === avatarSize.width && avatarSize.height === avatarSize.height) {
            httpLogger.info('/avatar-start-upload')
            request
                .post(uploadUrl)
                .field('key', key)
                .field('name', key)
                .field('token', TOKEN)
                .attach('file', imageData, key)
                .set('Accept', 'application/json')
                .end((err, data) => {
                    if (err) {
                        errorLogger.info('/avatar-upload-faild:', err)
                        return next(JSON.stringify(errs.avatar_upload_faild))
                    }
                    httpLogger.info('/avatar-end-upload:', data)
                    res.resRawData = {
                        msg:cdnHost + key
                    }
                    next()
                })
        } else {
            next(JSON.stringify(errs.avatar_size_error))
        }
        fs.unlinkSync(filename)
    } catch (error) {
        next(error)
    }
})

const existsSync = (path) => {
    const isExists = fs.existsSync(path)
    if (!isExists) {
        fs.mkdirSync(path)
    }
}

module.exports = router
