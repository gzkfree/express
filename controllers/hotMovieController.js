var hotMovieDataModules = require('../dataModules/hotMovieModules')
const { resolve } = require('path')
exports.setHotMovie =async function (data) {
  await hotMovieDataModules.setHotMovie(data, result => {
      console.log(result)
    })

}
exports.getHotMovie = function (data, callback) {
  hotMovieDataModules.getHotMovie(data, result => {
    callback(result)
  })
}
exports.setHotMovieDetail = function (data, callback) {
    hotMovieDataModules.setHotMovieDetail(data, result => {
      callback(result)
  })
}