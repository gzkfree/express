var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'baixiu'
})
//查询所有文章
exports.getPosts=(query,callback)=>{
    var sql =`select posts.id, posts.title,users.nickname,categories.name,posts.created,posts.status
              from posts LEFT JOIN users ON posts.user_id=users.id 
              LEFT JOIN categories ON posts.category_id=categories.id
              where posts.isdeleted=0`
//拼接sql
        if(query.category_id)
        {
            sql+= ` and category_id= '${query.category_id}'`
        }
        if(query.status){
            sql+= ` and posts.status='${query.status}'`
        }
        sql+= ` ORDER BY created DESC
               limit ${(query.pageNum-1)*query.pageSize},${query.pageSize}`
        connection.query(sql,(err,results)=>{
        if(err){
            callback(err)
        }else{
            //查询完数据结果集之后，再进行总数量的查询汇总
            var sql =`select posts.id, posts.title,users.nickname,categories.name,posts.created,posts.status
              from posts LEFT JOIN users ON posts.user_id=users.id 
              LEFT JOIN categories ON posts.category_id=categories.id
              where posts.isdeleted=0`
//拼接sql
        if(query.category_id)
        {
            sql+= ` and category_id= '${query.category_id}'`
        }
        if(query.status){
            sql+= ` and posts.status='${query.status}'`
        }
        sql+= ` ORDER BY created DESC`
            connection.query(sql,(err1,results1)=>{
                if(err1){
                    callback(err1)
                }else{
                    //判断查询出来的数量，让查询结果起码为1不让插件生成页数的时候会报错
                    var total=results1.length
                    if(results1.length==0)
                    {
                        total=1
                    }
                    callback(null,{data:results,total:total})
                }
            })
        }
    })
}
//添加文章
exports.doAddPost=(query,callback)=>{
    var sql=`INSERT INTO posts (id, slug, title, feature, created, content, views, likes, status, user_id, category_id, isdeleted) VALUES 
             (null, ?, ?, ?, ?, ?, 40, 100, ?, ?, ?, 0)`
    connection.query(sql,[query.slug,query.title,query.feature,query.created,query.content,query.status,query.user_id,query.category_id],(err,results)=>{
        if(err){
            console.log(err)
            callback(err)
        }else{
            callback(null)
        }
    })
}
//根据Id查询文章
exports.getPostByID=(id,callback)=>{
    var sql=`select * from posts where id=?`
    connection.query(sql,id,(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results[0])
        }
    })
}
//编辑文章
exports.editPost=(obj,callback)=>{
    var sql='update posts set ? where id=?'
    connection.query(sql,[obj,obj.id],(err)=>{
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//根据id删除文章
exports.getDelPost=(id,callback)=>{
    var sql='update posts set isdeleted=1 where id=?'
    connection.query(sql,[id],(err)=>{
        if(err){
            callback(err)
        }
    })
}