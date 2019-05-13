const express = require('express')
const app = express()
const body = require('body-parser')

app.use(type('image'), body.json({
  limit: '2mb'
}))
app.use(type('video'), body.json({
  limit: '300mb'
}))
app.use(type('application/json'), body.json({
  limit: '30kb'
}))
app.use(type('application/x-www-form-urlencoded'), body.json({
  limit: '60kb'
}))


function type(type, fn) {
  return (req, res, next) => {
    const contentType = req.headers['content-type'] || ""
    if(!contentType.includes(type)) {
      return next()
    }
    fn(req, res, next)
  }
}
