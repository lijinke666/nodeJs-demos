/**
 * @author Jinke.Li
 * @email 1359518268@qq.com
 * @create date 2018-04-08 05:47:55
 * @modify date 2018-04-08 05:47:55
 * @desc     {
 *  "protobuf-textformat": "^1.0.0",
    "protobufjs": "^4.1.3"
}
*/
const net = require('net')
const debug = require('debug')('socketHelper')
const path = require('path')
const { promisify } = require("util")
const { HTTP_logger, Error_logger } = require('../../libs/logHelper')
const {
    socket_remote_path: {
        host,
        port,
    }
} = require('../../localconfig.json')

const ProtoBuf = require("protobufjs")   
const PBConfig = ProtoBuf.loadProtoFile(path.resolve(__dirname, '../../proto/poker_msg_ss.proto'))
const PBSSMsg = PBConfig.build('PBSSMsg')

const {
    concatBuffer,
    buildHeaders,
    createBuffer,
    getBuffer
} = require('./bufferHelper.js')

const helper = {
    /**
     * 处理buffer
     * @param {String} userId 用户id
     * @param {Object} sendMessage 发送数据
     */
    buildBufferData(userId,sendMessage={}){
        const msgBuf = getBuffer(PBSSMsg.encode(sendMessage))
        const headers = buildHeaders({ uid: userId, msgLength: msgBuf.length })
        const _Buffer_ = concatBuffer(headers, msgBuf)
        
        return _Buffer_
    },
    /**
     * 像游戏服务器发送数据
     * @param {String} userId 用户id
     * @param {Object} sendMessage 发送数据
     */
    requestGameServer({userId,sendMessage},waitResponse = true) {
        return new Promise((res, rej) => {
            const client = new net.Socket()
            client.connect(port, host, () => {
                debug('连接成功!')
                const sendBuffer = helper.buildBufferData(userId,sendMessage)
                client.write(sendBuffer)
                if(!waitResponse){
                    client.destroy()
                    res(true)
                }
            })

            client.on('data', (data) => {
                debug('接收游戏服务器数据')
                const bufLen = data.readInt32BE(55);
                const sliceBuffer = data.slice(55)
                const _data_ = PBSSMsg.decode(sliceBuffer, bufLen)
                res(_data_)
                client.destroy()
            })
            client.on('error', (err) => {
                rej(err)
                debug('socket连接失败', err)
            })
    
            client.on('close', () => {
                debug('连接关闭')
                res(true)
            })

        })
    }
}

module.exports = helper

