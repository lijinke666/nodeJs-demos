module.exports =  {
    //获取客户端ip
    getClientIp(req) {
        return req.headers['x-forwarded-for'] ||              //反向代理ip
            req.connection.remoteAddress ||                   //远端ip
            req.socket.remoteAddress ||                       //socket ip
            req.connection.socket.remoteAddress
    }
};