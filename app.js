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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//配置使用session
//body接收参数配置

//使用中间件，所有路由请求的都必须经过这个中间件
//设置跨域请求
app.all('*', function (req, res, next) {
    //设置请求头
    //允许所有来源访问
    res.header('Access-Control-Allow-Origin', '*')
    //用于判断request来自ajax还是传统请求
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept,token");
    //允许访问的方式
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    //修改程序信息与版本
    // res.header('X-Powered-By', ' 3.2.1')
    //内容类型：如果是post请求必须指定这个属性
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})
app.use((req, res, next) => {
<<<<<<< HEAD
    if (req.url == '/login' || req.url == '/getToken' || req.url == '/weblogin') {
=======
    let unlessRoute=['/login','/getToken','/getHotMovieList']
    if (unlessRoute.indexOf(req.url)!=-1) {
>>>>>>> 90293b18319eaa83f85512e25d7418952eefa103
        next()
        return
    }
    let result = new jwt().verifyToken(req.headers.token)
    console.log(result)
    if (result == 'err') {
        res.json({
            code: 401,
            msg: 'token过期',
            data: null
        })
    } else {
        req.body.openid = result
        next()
    }
})
<<<<<<< HEAD


=======
>>>>>>> 90293b18319eaa83f85512e25d7418952eefa103
app.use(router)
