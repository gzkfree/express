var schedule = require('node-schedule');
let spidergetMovie = require('../util/getMovie')
<<<<<<< HEAD
let spidergetMovieDetail = require('../util/getMovieDetail')
exports.scheduleCronstyle = async function () {
    let j = schedule.scheduleJob('45 04 17 * * 1', async function () {
        console.log('scheduleCronstyle:' + new Date());
=======
let spidergetMovieDetail=require('../util/getMovieDetail')
exports.scheduleCronstyle = function () {
    let j= schedule.scheduleJob('30 50 10 * * 5', async function () {
        console.log('scheduleCronstyle:' + new Date());
        // // 爬取热门列表
        // j.cancel()
        // setInterval(()=>{
        //     console.log(new Date().getSeconds())
        // },1000)
>>>>>>> 90293b18319eaa83f85512e25d7418952eefa103
        await spidergetMovie.getHotMovieList()
        await spidergetMovieDetail.getHotMovieDetail()
    });
}

