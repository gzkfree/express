//引入服务器框架
var express = require('express')
//引入路由模块
var router = require('./router')
//创建服务器应用
var app = express()
//引入ejs
var ejs = require('ejs')
//引入post接收参数模块
var bodyParser = require('body-parser')
var unless = require('express-unless')
//引入session模块，目的处理登录状态
var jwt = require('./commom/jwt.js')
//配置模块引擎为ejs
app.set('view engine', 'ejs')
//下面这个配置的作用是配置ejs的模板文件夹，以后ejs会自动的去指定的目录下寻找页面文件
app.set('views', __dirname + '/views')
//监听端口请求
app.listen('3004', () => {
    console.log('http://127.0.0.1:3004')
})
//托管静态资源于配置
app.use(express.static('assets'))
// app.set('view options', {s
//     debug: process.env.NODE_ENV != 'producion'
// })
//中间件接收参数
app.use(bodyParser.urlencoded({ extended: false }))
//配置使用session
//body接收参数配置

//使用中间件，所有路由请求的都必须经过这个中间件
app.use((req, res, next) => {
    if (req.url == '/login' || req.url == '/getToken') {
        next()
        return
    }
    let result = new jwt().verifyToken(req.headers.token)
    console.log(result)
    if (result == 'err') {
        res.json({
            code: '201',
            msg: 'fail',
            data: 'token过期'
        })
    } else {
        req.body.openid = result
        next()
    }
})

app.use(router)
