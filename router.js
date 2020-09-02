var express = require('express')
//创建路由模块
var router = express.Router()
//引入用户控制模块
var userController = require('./controllers/userController')
//引入分类控制模块
// var categoriesController = require('./controllers/categoriesController')
//引入文章控制模块
// var postController = require('./controllers/postController')
//引入文件上传模块
var uploadController = require('./controllers/uploadController')
//引入设置模块
// var setController = require('./controllers/setController')
//管理前台页面
router.post('/login', userController.doLogin)
      //上传文件
      .post('/admin/uploadFile', uploadController.doUpload)


//暴露rouder
module.exports = router