///创建新的连接
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})
//查询所有分类
exports.doGetAllcategories = (callback) => {
    var sql = 'select * from categories'
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            callback(null, results)
        }
    })
}
//添加分类

exports.doAddCategories = (obj, callback) => {
    var sql = 'INSERT INTO categories VALUES (NULL, ? ,? )'
    connection.query(sql,[obj.slug,obj.name],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//编辑分类
exports.doEdit=(obj,callback)=>{
    var sql='UPDATE categories SET `name`=?,slug=? WHERE id=?'
    connection.query(sql,[obj.name,obj.slug,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//删除分类
exports.doDel=(obj,callback)=>{
    console.log(obj.id)
    var sql = `delete from categories where id in (${obj.id})`
    connection.query(sql,(err)=>{
        if(err){
            console.log(1)
            callback(err)
        }else{
            console.log(2)
            callback(null)
        }
    })
}