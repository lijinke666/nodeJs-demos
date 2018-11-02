/**
 * @name deepRead
 * @desc 获取一个文件夹下面所有的文件名,递归实现
 * @desc 第二种实现
 */

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "../xml2excel")

function deepRead(dir = __dirname) {
    if (!fs.existsSync(dir)) throw new Error(`${dir}: 不存在`)
    return fs
        .readdirSync(dir)
        .reduce((filenames, item) => {
            const _path = path.join(dir, item)
            const isDirectory = fs.lstatSync(_path).isDirectory()
            return filenames.concat(item, isDirectory && deepRead(_path))
        }, [])
        .filter((path)=> path)
}


const files = deepRead(filePath)

console.log(files);