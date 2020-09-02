var postModules = require('../dataModules/postModules')
var monent = require('moment')
var myurl = require('url')
//查询所有文章
exports.getAllposts = (req, res) => {
    var obj = myurl.parse(req.url, true).query
    postModules.getPosts(obj, (err, data1) => {
        if (err) {
            res.json({
                code: '201',
                msg: '连接错误'
            })
        }
        if (data1) {
            //遍历数据库查询回来的结果格式化日期
            data1.data.forEach((value, index) => {
                value.created = monent(value.created).format('YYYY-MM-DD HH:mm')
            });
            res.json(111)

        } else {
            res.json({
                code: '200',
                msg: '数据为空'
            })
        }
    })
}
//添加文章
exports.doAddPost = (req, res) => {
    var obj = req.body
    obj['user_id'] = req.session.currentUser.id
    console.log(obj)
    postModules.doAddPost(obj, (err) => {
        if (err) {
            res.json({
                code: '201',
                msg: '添加失败'
            })
        } else {
            res.json({
                code: '200',
                msg: '添加成功'
            })
        }
    })
}
//根据id获取文章
exports.getPostByID = (req, res) => {
    var id = myurl.parse(req.url, true).query.id
    postModules.getPostByID(id, (err) => {
        if (err) {
            res.json({
                code: '201',
                msg: '获取文章失败'
            })
        } else {
            result.created = monent(result.created).format('YYYY-MM-DDTHH:mm')
            res.json({
                code: '200',
                msg: '获取文章信息成功',
                data: result
            })
        }
    })
}
//编辑文章
exports.editPost = (req, res) => {
    postModules.editPost(req.body, (err) => {
        if (err) {
            res.json({
                code: '201',
                msg: '编辑失败'
            })
        } else {
            res.json({
                code: '200',
                msg: '编辑成功',
            })
        }
    })
}
//删除文章
exports.doDelPost = (req, res) => {
    var id = myurl.parse(req.url, true).query.id
    postModules.getDelPost(id, (err) => {
        if (err) {
            res.json({
                code: '201',
                msg: '删除失败'
            })
        } else {
            res.json({
                code: '200',
                msg: '删除成功'
            })
        }
    })
}
