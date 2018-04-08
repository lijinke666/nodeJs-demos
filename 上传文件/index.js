const multiparty = require('multiparty')
const fs = require("fs")
const path = require('path')
const debug = require('debug')('uploadHelper')
const crypto = require('crypto')
const helper = {
    maxFileSize: 1024 * 1024 * 50,               //文件上传大小 最大50MB
    md5FileName(fileName){
        const md5 = crypto.createHash('md5')
        return md5.update(fileName + Date.now()).digest('hex')
    },
    //检查文件大小
    checkFileSize(fileSize) {
        return new Promise((res, rej) => {
            HTTP_logger.info('checkFileSize-filesize:',fileSize)
            if (fileSize > this.maxFileSize) {
                rej(`文件最大 ${this.maxFileSize / 1024} MB`)
            } else {
                res(fileSize)
            }
        })
    },
    /**
     * 上传文件
     * @param {Object} req 请求头 
     * @param {String} savePath 保存路径
     * @param {String} writePath 写入数据库的路径
     * @param {String} fileName 文件名 不填 默认当前文件名 
     */
    uploadFile(req, options = {
        savePath: "",
        writePath:"",
        fileName: ""
    }) {
        let {
            savePath,
            fileName
        } = options
        const form = new multiparty.Form()
        return new Promise((res, rej) => {
            form.parse(req, (err, fields, files) => {
                if (err) return rej(err)
                files[Object.keys(files)[0]].forEach((file) => {
                    const {
                        originalFilename,
                        size,
                        path:_path
                    } = file
                    // const suffix = originalFilename.replace(/.*(\..*)$/,'$1')
                    const suffix = path.extname(originalFilename)
                    debug(`文件名 : ${originalFilename}, 大小: ${size}, path: ${_path}`)
                    this.checkFileSize(size)
                        .then(() => {
                            fileName = fileName ? fileName : md5FileName(originalFilename)+suffix
                            this.saveFile(_path,savePath,fileName)
                                .then((writePath) => res(fileName))
                                .catch((err) => rej(err))
                        }).catch((err) => rej(err))
                })
            })
        })
    },
    /**
     * 保存文件
     * @param {String} readPath 读取临时路径
     * @param {String} savePath 保存路径
     * @param {String} saveFileName 文件名
     */
    saveFile(readPath, savePath, saveFileName) {
        return new Promise((res, rej) => {
            const fileBuffer = fs.readFileSync(readPath)
            debug(`${readPath}读取成功!`)
            const writePath = savePath + saveFileName
            fs.writeFile(writePath, fileBuffer, (err) => {
                if (err) return rej(err)
                debug(`${writePath}保存成功!`)
                res(writePath)
            })
        })
    }
}

module.exports = helper

