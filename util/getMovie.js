const puppeteer = require('puppeteer');
const { resolve } = require('path');
const cookies = require('../cookies');
var hotMovieController = require('../controllers/hotMovieController');

let getHotMovieList = async () => {
  const browser = await (puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
    // executablePath: 'D:/chrome-win32/chrome.exe',
    //设置超时时间
    timeout: 45000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: true
  }));
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto('https://movie.douban.com', { timeout: 0 });
  console.log('加载完成')
  // sleep(1000)
  await page.waitFor(2000)
  try {
    const list = await page.evaluate(() => {
      let itemList = document.querySelectorAll('.slide-mode .slide-page')
      const listData = []
      // 存放寻找的index
      let pageIndex = []
      console.log(itemList)

      itemList.forEach((item) => {
        let result = pageIndex.find((item2) => {
          return item2 == item.getAttribute('data-index')
        })
        if (result) {
          return
        } else {
          pageIndex.push(item.getAttribute('data-index'))
        }

        const list2 = item.querySelectorAll('.item')
        console.log(list2)
        list2.forEach((item2) => {
          let movieData = {
            link: '', // 爬取到的商品详情链接
            picture: '',// 爬取到的图片链接
            star: '', // 价格，number类型，需要从爬取下来的数据进行转型
            title: '',// 爬取到的商品标题
          };
          let img = item2.querySelector('img')
          let strt = item2.querySelector('strong')
          movieData.picture = img.src
          movieData.link = item2.href
          movieData.star = strt.innerText
          movieData.title = img.alt
          listData.push(movieData)
        })
        // listData.push(list2)
      })

      return listData
    })
    await hotMovieController.setHotMovie(list)
  }
  catch (e) {
    console.log(e)
  }


  // await page.screenshot({
  //   path: 'jianshu.png',
  //   type: 'png',
  //   // quality: 100, 只对jpg有效
  //   fullPage: true,
  //   // 指定区域截图，clip和fullPage两者只能设置一个
  //   // clip: {
  //   //   x: 0,
  //   //   y: 0,
  //   //   width: 1000,
  //   //   height: 40
  //   // }
  // });
  // browser.close();
}
module.exports = {
  getHotMovieList
}