const utils = require('util')
const childProcess = require('child_process')

const exec = utils.promisify(childProcess.exec)

const ls = async ()=>{
    const {stdout,stderr}  = await exec('ls')
    console.log(''+stdout);
    console.log(''+stderr);
}

ls()
