var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})
//得到邮箱信息
exports.getLogin = (email, callback) => {
    var sql = 'select * from users where email=?'
    connection.query(sql, [email], (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null, results[0])
        }
    })
}
