
var uerdataModules = require('../dataModules/userModules')
var axios = require('axios')
//登录请求
exports.doLogin = (req, res) => {
    console.log(req.body)
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${req.body.appid}&secret=aeb074f318ca987a15f1438bf7dcf918&js_code=${req.body.code}&grant_type=authorization_code`)
        .then(wxres => {
            res.json({
                code: '200',
                msg: '成功',
                data: wxres.data
            })
        })

}
