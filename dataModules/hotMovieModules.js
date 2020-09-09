var mysql = require('mysql')
const { resolve } = require('path')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ahkenapp'
})

exports.setHotMovie =async function (data, callback) {
    let movieList = Array.from(data)
   await Promise.allSettled(movieList.map(item => {
        return new Promise(resolve => {
            var sql = 'select * from hot_movie where title=?'
            connection.query(sql, [item.title], (err, result) => {
                if (result.length == 0) {
                    var sql = `INSERT INTO hot_movie (link , picture, star ,title) VALUES (?,?,?,?)`
                    connection.query(sql, [item.link, item.picture, item.star, item.title], (err, result) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(result)
                            resolve()
                        }
                    })
                } else {
                    callback('已经存在，跳过写入')
                    resolve()
                }
            })
        })
    }))
    callback('完成写入')
}

exports.getHotMovie=function(data,callback){
    var sql='select link from hot_movie'
    connection.query(sql,[],(err,result)=>{
        if(err){
            callback(err)
        }else{
            callback(result)
        }
    })
}
exports.setHotMovieDetail=function(data,callback){
    var sql=`INSERT INTO hot_movie_detail (title,director , scriptwriter, protagonist ,type, official_website,producer_country,language,release_date,other_name,detail)
             VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    connection.query(sql,[data.title, data.director,data.scriptwriter,data.protagonist,data.type,data.official_website,data.producer_country,data.language,data.release_date,data.other_name,data.detail],(err,result)=>{
        if(err){
            callback(err)
        }else{
            callback(result)
        }
    })
}