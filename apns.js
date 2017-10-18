sendAppleApnsMessage(){
    const service = new apn.Provider({
        cert:certPath,
        key:keyPath,
        geteway:"gateway.sandbox.push.apple.com",
        passphrase: "1" //pem证书密码
    })
    const note = new apn.Notification({
        alert:"测试111"
    })
    service.send(note,tokens).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log('err',error);
    })

    service.shutdown()
}