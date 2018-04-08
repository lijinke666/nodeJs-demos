/*
 * @Author: jinke.li 
 * @Date: 2017-06-27 15:42:11 
 */

const xlsx = require('xlsx')
const XLSX = require('node-xlsx').default
const debug = require('debug')('helper:utils')
const path = require('path')
const moment = require('moment')
const fs = require('fs')
module.exports = {
    //处理sequelize 对data的封装
    parseData(data) {
        return JSON.parse(JSON.stringify(data))
    },
    //转换xls库 需要的头部格式
    // { A1: { v: { id: 1, name: '李金珂', age: 18 } },
    //   B1: { v: { id: 2, name: '赵日天', age: 19 } },
    //   C1: { v: { id: 3, name: '皮皮虾', age: 20 } } }
    transformHeaders(headersData = []) {
        const data = headersData.map((v, i) => {
            return Object.assign({}, { v }, { position: String.fromCharCode(65 + i) + "1" })
        }).reduce((obj, next) => {
            return Object.assign({}, obj, { [next['position']]: { v: next['v'] } })
        }, {})
        debug('转换header 格式成功!')
        return data
    },
    //转换xls库 需要的数据格式
    // { A2: 1,
    //   B2: '李金珂',
    //   C2: 18,
    //   A3: 2,
    //   B3: '赵日天',
    //   C3: 19,
    //   A4: 3,
    //   B4: '皮皮虾',
    //   C4: 20 }
    transformBody(bodyData = [], headerData = []) {
        const data =
            bodyData
                .map((v, i) => {
                    return headerData.map((k, j) => {
                        return Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })
                    })
                })            //二维数组
                .reduce((prev, next) => prev.concat(next))    //二维数组转一维数组
                .reduce((obj, next) => {
                    return Object.assign({}, obj, { [next['position']]: next['v'] })
                }, {})
        debug('转换 body 成功!')
        return data
    },
    /**
     * 处理xls 库 需要的格式
     * @param {Array} bodyData   数据的内容
     * @param {Array} headerData 数据的头部
     * return 处理后的数据 和范围
     */
    transformData(bodyData = [], headerData = []) {
        const headers = this.transformHeaders(headerData)
        const bodys = this.transformBody(bodyData, headerData)

        const output = Object.assign({}, headers, bodys)
        const length = Object.keys(output)
        //范围
        const ref = `${length[0]} : ${length[length.length - 1]}`
        debug('转换数据格式成功!')
        return {
            output,
            ref
        }
    },
    /**
     * 生成excel文件  方案1
     * @param {String} filePath  生成excel的文件路径 
     * @param {String} sheetName  excel文件的选项卡名字 
     * @param {Array} bodyData  内容
     * @param {Array} headerData  表头
     * 
     */
    writeExcelFile(options = {}) {
        const {
            filePath,
            sheetName = 'user_pay',
            bodyData = [],
            headerData = [],
        } = options
        return new Promise((res, rej) => {
            if (!filePath) {
                rej('无效的文件名！')
            } else {
                const { output, ref } = this.transformData(bodyData, headerData)
                const workBook = {
                    SheetNames: [sheetName],
                    Sheets: {
                        [sheetName]: Object.assign({}, output, { '!ref': ref })
                    }
                }
                xlsx.writeFile(workBook, filePath)
                debug('生成excel成功')
                res('生成excel成功')
            }
        })
    },
    transformExcelHead(data = []) {
        return data.length >=1 ? Object.keys(data[0]) : []
    },
    tranformExcelBody(data = []) {
        return data.map((v) => Object.values(v))
    },
    /**
     * 生成excel文件  方案2
     * @param {String} filePath  生成excel的文件路径 
     * @param {String} sheetName  excel文件的选项卡名字 
     * @param {Array} bodyData  内容
     * 
     */
    createExcelFile(options) {
        const {
            sheetName = 'user_pay',
            data = [],
        } = options
        return new Promise((res, rej) => {
            if (!sheetName) {
                rej('无效的文件名！')
            } else {
                const head = this.transformExcelHead(data)
                const result = this.tranformExcelBody(data)
                result.unshift(head)
                debug('转换数据格式成功!')
                const buffer = XLSX.build([{ name: sheetName, data: result }])
                res(buffer)
                debug('生成excel buffer 成功!')
            }
        })
    }
}