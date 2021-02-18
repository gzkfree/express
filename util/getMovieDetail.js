const puppeteer = require('puppeteer');
const { resolve } = require('path');
const cookies = require('../cookies');
var hotMovieController = require('../controllers/hotMovieController');
const { getHotMovie } = require('../dataModules/hotMovieModules');


var getHotMovieDetail = function () {
    hotMovieController.getHotMovie('', async (result) => {
        var movieLink = result

        spiderMovie(movieLink)
    })
}

let spiderMovie = async (list) => {
    const browser = await (puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        executablePath: 'D:/chrome-win32/chrome.exe',
        //设置超时时间
        timeout: 45000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: false
    }));
    for (var i in list) {
        try {
            const page = await browser.newPage();
            await page.setCookie(...cookies);
            await page.goto(list[i].link, { timeout: 0 });
            console.log('加载完成', list[i].link)

            page.waitForNavigation({ timeout: 30000 })
            console.log(123)
            page.waitForSelector('.article', { timeout: 30000 })

            let movieDetalItem = await page.$eval('.article ', el => {
                console.log(el)
                // return new Promise(resolve => {
                let obj = {
                    movie_id: '',
                    title: '',// 标题
                    director: '',// 导演
                    scriptwriter: '', //编剧
                    protagonist: '', //主演
                    type: '', //类型
                    official_website: '', //官方网站
                    producer_country: '', //制片国家
                    language: '',//语言
                    release_date: '', //上映日期
                    runtime: '',//片长
                    other_name: '', //又名
                    detail: '' //详情
                }
                obj.title = document.querySelectorAll('h1 span')[0].innerText
                let tagList = el.querySelectorAll('.indent .subject #info span.pl')
                tagList.forEach(item => {
                    if (item.innerText.indexOf('导演') != -1) {
                        obj.director = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('编剧') != -1) {
                        obj.scriptwriter = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('主演') != -1) {
                        let protagonistName = ''
                        item.nextElementSibling.children.forEach(protagonistitem => {
                            // if (protagonistitem.querySelector('a')) {
                            protagonistName += protagonistitem.innerText + '/'
                            // }
                        })
                        obj.protagonist = protagonistName
                    } else if (item.innerText.indexOf('类型') != -1) {
                        obj.type = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('官方网站') != -1) {
                        obj.official_website = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('制片国家') != -1) {
                        obj.producer_country = item.nextSibling.data
                    } else if (item.innerText.indexOf('语言') != -1) {
                        obj.language = item.nextSibling.data
                    } else if (item.innerText.indexOf('上映日期') != -1) {
                        obj.release_date = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('片长') != -1) {
                        obj.runtime = item.nextElementSibling.innerText
                    } else if (item.innerText.indexOf('又名') != -1) {
                        obj.other_name = item.nextSibling.data
                    }
                })

                let detailEl = el.querySelector('#link-report')
                obj.detail = detailEl.innerText
                return obj

                // })
            })
            console.log(movieDetalItem)


            movieDetalItem.movie_id = list[i].movie_id
            hotMovieController.setHotMovieDetail(movieDetalItem, (result) => {
                console.log(result)
            })
            page.close()
            await page.waitFor(3000)
        }
        catch (e) {
            console.log(e)
        }
    }

}
module.exports = {
    getHotMovieDetail
}