
var uerdataModules = require('../dataModules/userModules')
var axios = require('axios')
var jwt = require('../commom/jwt.js')
var WXBizDataCrypt = require('../commom/WXBizDataCrypt')
//登录请求
exports.doLogin = (req, res) => {
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${req.body.appid}&secret=aeb074f318ca987a15f1438bf7dcf918&js_code=${req.body.code}&grant_type=authorization_code`)
        .then(wxres => {
            res.json({
                code: '200',
                msg: 'success',
                data: wxres.data
            })
        })

}
//后台登录请求
exports.webLogin = (req, res) => {
    uerdataModules.weblogin(req.body, result => {
        console.log(result)
        if (result.length != 0) {
            let token = new jwt(result[0].username).generateToken()
            res.json({
                code: 1,
                msg: '登录成功！',
                data: token
            })
        } else {
            res.json({
                code: 0,
                msg: '账号不存在或者密码错误！',
                data: null
            })
        }
    })

}
exports.getToken = (req, res) => {
    let token = new jwt(req.body.openid).generateToken()
    res.json({
        code: '200',
        msg: 'success',
        data: token
    })
}
exports.checkToken = (req, res) => {
    res.json({
        code: '200',
        msg: 'success',
        data: '你好啊！'
    })
}
exports.updateUserInfo = (req, res) => {
    var pc = new WXBizDataCrypt('wxec0dd78d90c4b263', req.body.sessionKey)
    var data = pc.decryptData(req.body.encryptedData, req.body.iv)
    uerdataModules.updateUserInfo(data, (result) => {
        res.json({
            code: '200',
            msg: 'success',
            data: result
        })
    })
}