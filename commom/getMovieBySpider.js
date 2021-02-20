var schedule = require('node-schedule');
let spidergetMovie = require('../util/getMovie')
let spidergetMovieDetail = require('../util/getMovieDetail')
exports.scheduleCronstyle = function () {
    let j = schedule.scheduleJob('30 50 10 * * 5', async function () {
        console.log('scheduleCronstyle:' + new Date());
        // // 爬取热门列表
        // j.cancel()
        // setInterval(()=>{
        //     console.log(new Date().getSeconds())
        // },1000)
        await spidergetMovie.getHotMovieList()
        await spidergetMovieDetail.getHotMovieDetail()
    });
}

