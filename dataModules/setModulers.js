var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})
exports.doAddNav_Menus=(obj,callback)=>{
    var sql ='select `value` from options where `key`= "nav_menus"'
    connection.query(sql,(err,result)=>{
        if(err){
            callback(err)
        }else{
            var arr=JSON.parse(result[0].value)
            arr.push(obj)
            var str=JSON.stringify(arr)
            var sql='update options set `value`=? where `key`="nav_menus"'
            connection.query(sql,str,(err)=>{
                if(err){
                    callback(err)
                }else{
                    callback(null)
                }
            })
        }
    })
}