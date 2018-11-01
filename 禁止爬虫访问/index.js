module.exports = (userAgent) => (req,res,next) => {
  const source = req.get('User-Agent') || ''
  const match = userAgent.some(ua => ua.test(source));
  if( match ){
    // 403 Forbidden 禁止访问
    return res.sendStatus(403)
  }
  return next()
}



// 使用  禁止百度爬虫

app.use(robotMiddleware([/Baiduspider/i]))

