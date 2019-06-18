/**
 * @name 自动评论
 */
const puppeteer = require("puppeteer");
const URL = "http://www.baidu.com";

(async () => {
    try {
      const browser = await puppeteer.launch({
        // 关闭无头模式，方便我们看到这个无头浏览器执行的过程
        headless: false
      });

      //新建一个窗口
      const page = await browser.newPage();
      await page.goto(URL, { waitUntil: "networkidle2" }); // 等待网络状态为空闲的时候才继续执行

    } catch (error) {
      console.log("error\n", error);
      process.exit(0);
    }
  })();
