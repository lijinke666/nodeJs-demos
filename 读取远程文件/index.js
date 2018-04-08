const Client = require('ssh2-sftp-client')
const SClient = require('ssh2').Client
const {StringDecoder} = require('string_decoder')
const decoder = new StringDecoder('utf8')

const {
    remotePath,
    host,
    port,
    username,
    password
} = require('config.json')

const getGameConfigFile = ({filename}) => {
    if(!filename) throw new Error('filename 不能为空!')
    const shell = `cd ${romotePath} && cat ${filename}`
    const conn = new SClient()
    const chunks = []
    let size = 0
    return new Promise((res,rej)=>{
        conn.on('ready', ()=> {
            conn.exec(shell,(err, stream) => {
              if (err) {
                  rej(err)
                  throw new Error(err)
                }
              stream.on('close',(code, signal)=> {
                const result = Buffer.concat(chunks,size).toString()
                res(result)
                conn.end();
              }).on('data',(data)=> {
                  chunks.push(data)
                  size+= data.length
              }).stderr.on('data', function(data) {
                rej(data+"")
              });
            });
          }).connect({
            host,
            port,
            username,
            password
          })
    })
}