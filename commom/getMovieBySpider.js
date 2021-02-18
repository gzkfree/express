var schedule = require('node-schedule');
let spidergetMovie = require('../util/getMovie')
let spidergetMovieDetail = require('../util/getMovieDetail')
exports.scheduleCronstyle = async function () {
    let j = schedule.scheduleJob('45 04 17 * * 1', async function () {
        console.log('scheduleCronstyle:' + new Date());
        await spidergetMovie.getHotMovieList()
        await spidergetMovieDetail.getHotMovieDetail()
    });
}

