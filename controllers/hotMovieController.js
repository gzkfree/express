var hotMovieDataModules = require('../dataModules/hotMovieModules')
exports.setHotMovie = function (data) {
     hotMovieDataModules.setHotMovie(data, result => {
       console.log(result)
    })
   
}