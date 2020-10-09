var express = require('express')
//创建路由模块
var router = express.Router()
//引入用户控制模块
var userController = require('./controllers/userController')
var hotMovieController = require('./controllers/hotMovieController')
//引入文件上传模块
var uploadController = require('./controllers/uploadController')
//引入设置模块
// var setController = require('./controllers/setController')
//管理前台页面
var getMovieBySpider=require('./commom/getMovieBySpider')
getMovieBySpider.scheduleCronstyle()
router.post('/login', userController.doLogin)
      //上传文件
      .post('/getToken', userController.getToken)
      .post('/checkToken', userController.checkToken)
      .post('/getHotMovieList', hotMovieController.getHotMovieList)
      .post('/admin/uploadFile', uploadController.doUpload)
      .post('/updateUserInfo',userController.updateUserInfo)


//暴露rouder
module.exports = router