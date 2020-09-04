var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ahkenapp'
})
//更新用户信息
exports.updateUserInfo = (data, callback) => {
    var sql = 'select * from wx_user where openid=?'
    connection.query(sql, [data.openid], (err, results) => {
        if(results.length==0){
            sql='INSERT INTO wx_user (openid, nickname, avatarurl,gender,country,province,city,language,ctime)  VALUES (?,?,?,?,?,?,?,?,?);'
            connection.query(sql,[data.openId,data.nickName,data.avatarUrl,data.gender,data.country,data.province,data.city,data.language,new Date()],(err,results)=>{
                if(err){
                    callback(err)
                }else{
                    callback(data)
                }
            })
        }else{
            var sql='update wx_user SET openid=?, nickname=?, avatarurl=?,gender=?,country=?,province=?,city=?,language=?,ctime=? where openid=?'
            connection.query(sql,[data.openId,data.nickName,data.avatarUrl,data.gender,data.country,data.province,data.city,data.language,new Date()],(err,results)=>{
                if(err){
                    callback(err)
                }else{
                    callback(data)
                }
            })
        }
    })
}
