var hotMovieDataModules = require('../dataModules/hotMovieModules')
exports.setHotMovie = function (data) {
  hotMovieDataModules.setHotMovie(data, result => {
    console.log(result)
  })
}
exports.getHotMovie = function (data ,callback) {
  hotMovieDataModules.getHotMovie(data, result => {
    callback(result)
  })
}
exports.setHotMovieDetail=function(data,callback){
  hotMovieDataModules.setHotMovieDetail(data,result=>{
      callback(result)
  })
}