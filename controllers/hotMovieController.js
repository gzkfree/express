var hotMovieDataModules = require('../dataModules/hotMovieModules')
const { resolve } = require('path')
exports.setHotMovie = async function (data) {
  await hotMovieDataModules.setHotMovie(data, result => {
    console.log(result)
  })

}
exports.getHotMovie = function (data, callback) {
  hotMovieDataModules.getHotMovie(data, result => {
    callback(result)
  })
}
exports.getHotMovieToCilent = function (req, res) {
  hotMovieDataModules.getAllMovie(req.bodey, result => {
    res.json({
      code: 1,
      msg: '请求成功',
      data: result
    })
  })
}
exports.setHotMovieDetail = function (data, callback) {
  hotMovieDataModules.setHotMovieDetail(data, result => {
    callback(result)
  })
}